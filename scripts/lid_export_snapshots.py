# -*- coding: utf-8 -*-
import os, io, re, json
import fitz  # PyMuPDF
from PIL import Image

PDF_PATH = os.environ.get("LID_PDF", "public/data/gesamtfragenkatalog-lebenindeutschland.pdf")
OUT_DIR  = "public/assets/lid/snapshots"
os.makedirs(OUT_DIR, exist_ok=True)

STATE_CODE = {
    "Berlin":"BE","Bayern":"BY","Brandenburg":"BB","Baden-Württemberg":"BW",
    "Bremen":"HB","Hamburg":"HH","Hessen":"HE","Mecklenburg-Vorpommern":"MV",
    "Niedersachsen":"NI","Nordrhein-Westfalen":"NW","Rheinland-Pfalz":"RP",
    "Saarland":"SL","Sachsen":"SN","Sachsen-Anhalt":"ST","Schleswig-Holstein":"SH",
    "Thüringen":"TH"
}
re_teil_general = re.compile(r"\bTeil\s+I\b", re.I)
re_teil_state   = re.compile(r"Teil\s+II\b.*Bundesland\s+([A-Za-zÄÖÜäöü\-]+)", re.I)
re_aufgabe      = re.compile(r"Aufgabe\s+(\d+)\b", re.I)
def nrm(s): import re as _re; return _re.sub(r"\s+"," ", s).strip()

doc = fitz.open(PDF_PATH)
current_section="general"; current_state=None
blocks=[]

for p in range(len(doc)):
    page = doc[p]
    txt = nrm(page.get_text())
    m_state=re_teil_state.search(txt)
    if m_state:
        name=m_state.group(1)
        best=None
        for k in STATE_CODE.keys():
            if k in name: best=k; break
        current_section="state"; current_state=STATE_CODE.get(best, current_state)
    elif re_teil_general.search(txt):
        current_section="general"; current_state=None

    tdict = page.get_text("dict")
    heads=[]
    for b in tdict.get("blocks", []):
        if b.get("type")!=0: continue
        for line in b.get("lines", []):
            t="".join(sp["text"] for sp in line.get("spans", []))
            m=re_aufgabe.search(t)
            if m:
                xs,ys=[],[]
                for sp in line.get("spans", []):
                    x0,y0,x1,y1=sp["bbox"]; xs+=[x0,x1]; ys+=[y0,y1]
                lb=(min(xs),min(ys),max(xs),max(ys))
                heads.append((int(m.group(1)), lb))
    heads.sort(key=lambda x:x[1][1])
    for i,(num,lb) in enumerate(heads):
        y0=lb[1]; y1=heads[i+1][1][1] if i+1<len(heads) else page.rect.br.y
        bbox=(page.rect.x0,y0,page.rect.x1,y1)
        if current_section=="general":
            qid=f"GEN{num:03d}"
        else:
            if not current_state: continue
            qid=f"{current_state}{num:02d}"
        blocks.append({"qid":qid,"page":p,"bbox":bbox})

def crop(page,bbox,scale=1.8):
    mat=fitz.Matrix(scale,scale)
    pix=page.get_pixmap(matrix=mat, clip=fitz.Rect(*bbox), alpha=False)
    return Image.open(io.BytesIO(pix.tobytes("png")))

index={}
for b in blocks:
    im=crop(doc[b["page"]], b["bbox"], 1.8)
    fn=f'{b["qid"]}.png'
    im.save(os.path.join(OUT_DIR, fn), "PNG", optimize=True)
    index[b["qid"]] = { "file": f"/assets/lid/snapshots/{fn}" }

with open(os.path.join(OUT_DIR,"index.json"),"w",encoding="utf-8") as f:
    json.dump(index,f,ensure_ascii=False,indent=2)

print(f"✅ Exported {len(index)} snapshots → {OUT_DIR}")
