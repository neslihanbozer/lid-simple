# -*- coding: utf-8 -*-
import os, io, re, json, statistics
from typing import Dict, List, Tuple, Optional
from PIL import Image
import fitz  # PyMuPDF

PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"
OUT_TEXT = "public/data/questions_text.json"
OUT_IMGMAP = "public/data/images_map.json"
OUT_DIR = "public/assets/lid/export"

os.makedirs(os.path.dirname(OUT_TEXT), exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

STATE_CODE = {
    "Berlin":"BE","Bayern":"BY","Brandenburg":"BB","Baden-Württemberg":"BW",
    "Bremen":"HB","Hamburg":"HH","Hessen":"HE","Mecklenburg-Vorpommern":"MV",
    "Niedersachsen":"NI","Nordrhein-Westfalen":"NW","Rheinland-Pfalz":"RP",
    "Saarland":"SL","Sachsen":"SN","Sachsen-Anhalt":"ST","Schleswig-Holstein":"SH",
    "Thüringen":"TH"
}

def nrm(s:str)->str:
    return re.sub(r"\s+"," ", s).strip()

# Detect sections / blocks
RE_GENERAL = re.compile(r"\bTeil\s+I\b", re.I)
RE_STATE   = re.compile(r"Teil\s+II\b.*Bundesland\s+([A-Za-zÄÖÜäöü\-]+)", re.I)
RE_TASK    = re.compile(r"Aufgabe\s+(\d+)\b", re.I)
RE_BILDROW = re.compile(r"Bild\s*1.*Bild\s*4", re.I)

# Choice bullets commonly seen
BULLETS = ["☐","□","■","◻","▪","–","-"]

def is_choice_line(s:str)->bool:
    s2 = s.strip()
    return any(s2.startswith(b) for b in BULLETS)

def strip_bullet(s:str)->str:
    s2 = s.strip()
    for b in BULLETS:
        if s2.startswith(b): return s2[len(b):].strip()
    return s2

def render_crop(page, rect:fitz.Rect, out_path:str, scale:float=2.0):
    """Render visible crop (keeps page styling / exact on-page look)."""
    mat = fitz.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    img.save(out_path, "PNG", optimize=True)

def extract_blocks(page):
    """Return list of ('text'|'image', Rect, payload_text_or_none). Uses page.get_text('dict') so image rects come with bbox."""
    d = page.get_text("dict")
    blocks=[]
    for b in d.get("blocks", []):
        if b.get("type")==0:  # text
            for line in b.get("lines", []):
                txt="".join(sp["text"] for sp in line.get("spans", []))
                xs=[]; ys=[]
                for sp in line.get("spans", []):
                    x0,y0,x1,y1 = sp["bbox"]; xs += [x0,x1]; ys += [y0,y1]
                bb = fitz.Rect(min(xs),min(ys),max(xs),max(ys))
                blocks.append(("text", bb, txt))
        elif b.get("type")==1:  # image
            bb = fitz.Rect(*b["bbox"])
            blocks.append(("image", bb, None))
    return blocks

def find_question_blocks(page)->List[Tuple[int, fitz.Rect]]:
    blocks = extract_blocks(page)
    heads=[]
    for typ,bb,txt in blocks:
        if typ=="text":
            m = RE_TASK.search(txt or "")
            if m:
                heads.append((int(m.group(1)), bb))
    heads.sort(key=lambda x: x[1].y0)
    out=[]
    for i,(num,bb) in enumerate(heads):
        y0 = bb.y0
        y1 = heads[i+1][1].y0 if i+1<len(heads) else page.rect.br.y
        out.append((num, fitz.Rect(page.rect.x0, y0, page.rect.x1, y1)))
    return out

def extract_texts(page, qrect:fitz.Rect)->Tuple[str, List[str], Optional[fitz.Rect]]:
    """Return (stem_text, [A..D], bild_row_rect or None)"""
    blocks = extract_blocks(page)
    lines=[]
    for typ,bb,txt in blocks:
        if typ!="text": continue
        if bb.y0>=qrect.y0 and bb.y1<=qrect.y1:
            lines.append((bb, txt))
    # drop heading lines
    lines = [(bb,t) for (bb,t) in lines if not RE_TASK.search(t or "")]
    stem_parts=[]; choices=[]; bild_row=None; seen_choice=False
    for bb,t in lines:
        if RE_BILDROW.search(t or ""):
            bild_row = bb; continue
        if is_choice_line(t or ""):
            seen_choice=True
            if len(choices)<4:
                choices.append(strip_bullet(t or ""))
        else:
            if not seen_choice:
                stem_parts.append(t or "")
    stem = nrm(" ".join(stem_parts))
    return stem, choices[:4], bild_row

def extract_images_positions(page)->List[fitz.Rect]:
    """Use get_images() + get_image_rects(xref) to obtain true on-page positions (xref-aware)."""
    rects=[]
    for xref, *_ in page.get_images(full=True):
        for r in page.get_image_rects(xref) or []:
            rects.append(fitz.Rect(r))
    return rects

def choose_choice_row(img_rects:List[fitz.Rect], bild_row:Optional[fitz.Rect], qrect:fitz.Rect):
    if not bild_row: return []
    # candidates above the "Bild 1 ... Bild 4" line, and inside qrect
    above=[r for r in img_rects if r.y1 <= bild_row.y0-1 and qrect.contains(r)]
    if len(above)<4: return []
    # group by Y band
    bins={}
    for r in above:
        key=int(r.y0//25)
        bins.setdefault(key, []).append(r)
    best=[]
    best_score=(-1,-1.0)
    for arr in bins.values():
        if len(arr)<4: continue
        arr_sorted = sorted(arr, key=lambda rr: rr.x0)
        areas = [(rr.x1-rr.x0)*(rr.y1-rr.y0) for rr in arr_sorted[:4]]
        med = statistics.median(areas)
        score=(len(arr_sorted), med)
        if score>best_score:
            best_score=score; best=arr_sorted[:4]
    return best  # left→right (A..D assumed)

def biggest_leftover(img_rects, used, qrect):
    rest=[r for r in img_rects if (r not in used) and qrect.contains(r)]
    rest2=[]
    for r in rest:
        w=r.x1-r.x0; h=r.y1-r.y0
        if w>=18 and h>=18:
            ar=w/h
            if 0.35<=ar<=2.8:
                rest2.append((r, w*h))
    rest2.sort(key=lambda x:x[1], reverse=True)
    if not rest2: return None
    if len(rest2)==1: return rest2[0][0]
    if rest2[0][1] > rest2[1][1]*1.3: return rest2[0][0]
    return None

def filename_for(kategori:str, num_str:str, stem_ok:bool, choices_ok:bool, slot:str)->str:
    return f"{kategori}_{num_str}_{'sorukismi' if stem_ok else 'xxx'}_{'siklar' if choices_ok else 'xxxx'}_{slot}.png"

# ----------------- main walk -----------------
doc = fitz.open(PDF)
section="general"; state=None
questions_out=[]; images_out=[]

for p in range(len(doc)):
    page = doc[p]
    txt = nrm(page.get_text())
    m_state = RE_STATE.search(txt)
    if m_state:
        name = m_state.group(1); found=None
        for full,code in STATE_CODE.items():
            if full in name: found=code; break
        section="state"; state = found or state
    elif RE_GENERAL.search(txt):
        section="general"; state=None

    for num, qrect in find_question_blocks(page):
        qid = f"GEN{num:03d}" if section=="general" else f"{state}{num:02d}"
        stem_text, choices_text, bild_row = extract_texts(page, qrect)
        questions_out.append({
            "id": qid,
            "section": section,
            "state": state if section=="state" else None,
            "number": num,
            "text": stem_text,
            "choices": [{"id":k,"text":v} for k,v in zip(["A","B","C","D"], choices_text)]
        })

        img_rects = extract_images_positions(page)
        choice_rects = choose_choice_row(img_rects, bild_row, qrect)
        has_choices = len(choice_rects)==4

        # file name parts
        if qid.startswith("GEN"):
            kategori="GEN"; num_str=qid[3:]
        else:
            kategori=qid[:2]; num_str=qid[2:]

        # save choices
        labels=["A","B","C","D"]
        for lab, r in zip(labels, choice_rects):
            out_name = filename_for(kategori, num_str, False, True, lab)
            out_path = os.path.join(OUT_DIR, out_name)
            render_crop(page, r, out_path, scale=2.0)
            images_out.append({"id": qid, "slot": lab, "path": f"/assets/lid/export/{out_name}"})

        # STEM = biggest leftover in qrect
        stem_rect = biggest_leftover(img_rects, set(choice_rects), qrect)
        if stem_rect:
            out_name = filename_for(kategori, num_str, True, has_choices, "STEM")
            out_path = os.path.join(OUT_DIR, out_name)
            render_crop(page, stem_rect, out_path, scale=2.0)
            images_out.append({"id": qid, "slot": "STEM", "path": f"/assets/lid/export/{out_name}"})


# write files
with open(OUT_TEXT, "w", encoding="utf-8") as f:
    json.dump({"questions": questions_out}, f, ensure_ascii=False, indent=2)

with open(OUT_IMGMAP, "w", encoding="utf-8") as f:
    json.dump({"images": images_out}, f, ensure_ascii=False, indent=2)

print(f"✅ Wrote {OUT_TEXT} with {len(questions_out)} questions")
print(f"✅ Wrote {OUT_IMGMAP} with {len(images_out)} image slots")
print(f"✅ Crops at {OUT_DIR}")
