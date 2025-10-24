# -*- coding: utf-8 -*-
import os, io, re, json, statistics
import fitz  # PyMuPDF
from PIL import Image, ImageDraw

PDF_INPUT = os.environ.get("LID_PDF", "public/data/gesamtfragenkatalog-lebenindeutschland.pdf")
OUT_ROOT  = "public"
ASSETS    = os.path.join(OUT_ROOT, "assets", "lid")
DATA_DIR  = os.path.join(OUT_ROOT, "data")

STATE_CODE = {
    "Berlin":"BE","Bayern":"BY","Brandenburg":"BB","Baden-Württemberg":"BW",
    "Bremen":"HB","Hamburg":"HH","Hessen":"HE","Mecklenburg-Vorpommern":"MV",
    "Niedersachsen":"NI","Nordrhein-Westfalen":"NW","Rheinland-Pfalz":"RP",
    "Saarland":"SL","Sachsen":"SN","Sachsen-Anhalt":"ST","Schleswig-Holstein":"SH",
    "Thüringen":"TH"
}
STATE_CODES = set(STATE_CODE.values())

os.makedirs(ASSETS, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(os.path.join(ASSETS,"general"), exist_ok=True)
for s in STATE_CODES: os.makedirs(os.path.join(ASSETS,"states",s), exist_ok=True)

def nrm_text(s:str)->str:
    return re.sub(r"\s+"," ", s).strip()

def render_page(page, scale=2.0):
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
    return Image.open(io.BytesIO(pix.tobytes("png"))), scale

def pdf_to_px(rect, scale):
    x0,y0,x1,y1 = rect; return (int(x0*scale), int(y0*scale), int(x1*scale), int(y1*scale))

doc = fitz.open(PDF_INPUT)

# ---------- index "Aufgabe n" blocks ----------
re_aufgabe = re.compile(r"Aufgabe\s+(\d+)\b", re.I)
re_teil_general = re.compile(r"\bTeil\s+I\b", re.I)
re_teil_state   = re.compile(r"Teil\s+II\b.*Bundesland\s+([A-Za-zÄÖÜäöü\-]+)", re.I)
re_bild         = re.compile(r"Bild\s*[1-4]", re.I)

current_section = "general"
current_state = None
index = {}

for p in range(len(doc)):
    page = doc[p]
    txt = nrm_text(page.get_text())
    m_state = re_teil_state.search(txt)
    if m_state:
        name = m_state.group(1)
        best = None
        for k in STATE_CODE.keys():
            if k in name: best = k; break
        current_section = "state"
        current_state = STATE_CODE.get(best, current_state)
    elif re_teil_general.search(txt):
        current_section = "general"; current_state = None

    tdict = page.get_text("dict")
    heads=[]
    for b in tdict.get("blocks", []):
        if b.get("type")!=0: continue
        for line in b.get("lines", []):
            line_text = "".join(sp["text"] for sp in line.get("spans", []))
            m = re_aufgabe.search(line_text)
            if m:
                xs,ys=[],[]
                for sp in line.get("spans", []):
                    x0,y0,x1,y1 = sp["bbox"]; xs+=[x0,x1]; ys+=[y0,y1]
                lb=(min(xs),min(ys),max(xs),max(ys))
                heads.append((int(m.group(1)), lb))
    heads.sort(key=lambda x: x[1][1])

    for i,(num, lb) in enumerate(heads):
        y0 = lb[1]
        y1 = heads[i+1][1][1] if i+1<len(heads) else page.rect.br.y
        block = (page.rect.x0, y0, page.rect.x1, y1)
        if current_section == "general":
            qid = f"GEN{num:03d}"
            index[qid] = {"section":"general","page":p+1,"bbox":block,"aufgabe":num}
        else:
            if not current_state: continue
            qid = f"{current_state}{num:02d}"
            index[qid] = {"section":"state","state":current_state,"page":p+1,"bbox":block,"aufgabe":num}

# ---------- text (stem + 4 choices) ----------
BULLETS = ["","□","■","◻","▪"]
def is_choice_line(s:str)->bool:
    s2 = s.strip()
    # Check for A), B), C), D) pattern
    if re.match(r'^[A-D]\)', s2): return True
    # Check for bullet points
    return any(s2.startswith(b) for b in BULLETS)

def strip_bullet(s:str)->str:
    s2 = s.strip()
    # Remove A), B), C), D) prefix
    s2 = re.sub(r'^[A-D]\)\s*', '', s2)
    # Remove bullet points
    for b in BULLETS:
        if s2.startswith(b): return s2[len(b):].strip()
    return s2

def extract_text_for_block(page, block):
    tdict = page.get_text("dict")
    lines=[]
    for b in tdict.get("blocks", []):
        if b.get("type")!=0: continue
        for line in b.get("lines", []):
            xs,ys=[],[]
            text="".join(sp["text"] for sp in line.get("spans", []))
            for sp in line.get("spans", []):
                x0,y0,x1,y1=sp["bbox"]; xs+=[x0,x1]; ys+=[y0,y1]
            lb=(min(xs),min(ys),max(xs),max(ys))
            if lb[1]>=block[1] and lb[3]<=block[3]:
                lines.append((lb,text))
    
    # Remove heading line
    lines = [(lb,t) for (lb,t) in lines if not re_aufgabe.search(t)]
    
    stem_parts=[]; choices=[]
    seen_choice=False
    
    for _,t in lines:
        t_clean = t.strip()
        if not t_clean: continue  # Skip empty lines
        
        # Check if this is a choice (starts with bullet)
        if t_clean.startswith("") or t_clean.startswith("□") or t_clean.startswith("■"):
            seen_choice=True
            if len(choices)<4: 
                clean_choice = strip_bullet(t_clean)
                if clean_choice:  # Only add non-empty choices
                    choices.append(clean_choice)
        elif not seen_choice:
            # This is part of the question stem
            stem_parts.append(t_clean)
    
    stem = nrm_text(" ".join(stem_parts))
    return stem, choices[:4]

# ---------- images ----------
def extract_images_for_block(page, block, qid, state):
    tdict = page.get_text("dict")
    # find "Bild" line bbox
    bild_rect=None
    for b in tdict.get("blocks", []):
        if b.get("type")!=0: continue
        for line in b.get("lines", []):
            text="".join(sp["text"] for sp in line.get("spans", []))
            xs,ys=[],[]
            for sp in line.get("spans", []):
                x0,y0,x1,y1 = sp["bbox"]; xs+=[x0,x1]; ys+=[y0,y1]
            lb=(min(xs),min(ys),max(xs),max(ys))
            if lb[1]<block[1] or lb[3]>block[3]: continue
            if re_bild.search(text):
                bild_rect=lb; break
        if bild_rect: break

    # collect image blocks inside block
    imgs=[]
    for b in tdict.get("blocks", []):
        if b.get("type")!=1 or "bbox" not in b: continue
        x0,y0,x1,y1=b["bbox"]
        if x0<block[0] or y0<block[1] or x1>block[2] or y1>block[3]: continue
        w,h=x1-x0, y1-y0
        if w<12 or h<12: continue
        ar = w/h
        if ar<0.35 or ar>2.5: continue
        imgs.append({"bbox":(x0,y0,x1,y1),"w":w,"h":h,"area":w*h,"cy":(y0+y1)/2})

    if not imgs: return None

    # If Bild band exists → choose 4 images above, same-row cluster → A..D
    chosen=None
    if bild_rect:
        above=[c for c in imgs if c["bbox"][3] <= bild_rect[1]-1]
        if len(above)>=4:
            bins={}
            for c in above:
                key=int(c["cy"]//25)
                bins.setdefault(key,[]).append(c)
            best_key=None; best_score=(-1,-1.0)
            for k,arr in bins.items():
                if len(arr)<4: continue
                med=statistics.median([a["area"] for a in arr])
                sc=(len(arr), med)
                if sc>best_score: best_score=sc; best_key=k
            if best_key is not None:
                chosen=sorted(bins[best_key], key=lambda c:c["bbox"][0])[:4]

    # Fallback: if exactly one standout image in block → STEM
    if not chosen:
        imgs_sorted = sorted(imgs, key=lambda c:c["area"], reverse=True)
        if imgs_sorted:
            if len(imgs_sorted)==1 or imgs_sorted[0]["area"]>imgs_sorted[1]["area"]*1.5:
                return {"kind":"single-image", "stem_bbox": imgs_sorted[0]["bbox"]}
        return None

    return {"kind":"image-choice", "choice_bboxes": [c["bbox"] for c in chosen]}

# ---------- wire it all ----------
questions=[]
imageMap={}

for qid, meta in sorted(index.items(), key=lambda kv:(kv[1]["section"], kv[0])):
    page = doc[meta["page"]-1]
    stem, choices = extract_text_for_block(page, meta["bbox"])
    entry = {
        "id": qid,
        "section": meta["section"],
        "state": meta.get("state"),
        "text": stem,
        "choices": [{"id":k,"text":v} for k,v in zip(["A","B","C","D"], choices)]
    }

    info = extract_images_for_block(page, meta["bbox"], qid, meta.get("state"))
    page_img, scale = render_page(page, 2.0)

    if info and info["kind"]=="image-choice":
        labels=["A","B","C","D"]; assets={}
        for i,bx in enumerate(info["choice_bboxes"]):
            r=pdf_to_px(bx, scale); crop=page_img.crop(r)
            if qid.startswith("GEN"):
                out_dir=os.path.join(ASSETS,"general"); href=f"/assets/lid/general/{qid}_{labels[i]}.png"; fs=os.path.join(out_dir, f"{qid}_{labels[i]}.png")
            else:
                st=meta.get("state") or qid[:2]; out_dir=os.path.join(ASSETS,"states",st); href=f"/assets/lid/states/{st}/{qid}_{labels[i]}.png"; fs=os.path.join(out_dir, f"{qid}_{labels[i]}.png")
            os.makedirs(out_dir, exist_ok=True); crop.save(fs, "PNG", optimize=True); assets[labels[i]]=href
        entry["kind"]="image-choice"; entry["assets"]=assets
        imageMap[qid]={"kind":"image-choice","state":meta.get("state"),"assets":assets,"page":meta["page"]}

    elif info and info["kind"]=="single-image":
        bx = info["stem_bbox"]; r=pdf_to_px(bx, scale); crop=page_img.crop(r)
        if qid.startswith("GEN"):
            out_dir=os.path.join(ASSETS,"general"); href=f"/assets/lid/general/{qid}.png"; fs=os.path.join(out_dir, f"{qid}.png")
        else:
            st=meta.get("state") or qid[:2]; out_dir=os.path.join(ASSETS,"states",st); href=f"/assets/lid/states/{st}/{qid}.png"; fs=os.path.join(out_dir, f"{qid}.png")
        os.makedirs(out_dir, exist_ok=True); crop.save(fs, "PNG", optimize=True)
        entry["kind"]="single-image"; entry["asset"]=href
        imageMap[qid]={"kind":"single-image","state":meta.get("state"),"asset":href,"page":meta["page"]}
    else:
        entry["kind"]="text"

    questions.append(entry)

with open(os.path.join(DATA_DIR,"questions_with_assets.json"),"w",encoding="utf-8") as f:
    json.dump({"questions":questions}, f, ensure_ascii=False, indent=2)

with open(os.path.join(ASSETS,"imageChoiceMap.json"),"w",encoding="utf-8") as f:
    json.dump(imageMap, f, ensure_ascii=False, indent=2)

print(f"✅ Extracted {len(questions)} questions; images mapped: {len(imageMap)}")
print("Output JSON:", os.path.join(DATA_DIR,"questions_with_assets.json"))
