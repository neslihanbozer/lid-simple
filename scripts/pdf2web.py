# -*- coding: utf-8 -*-
import os, io, re, json
import fitz
from PIL import Image

PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"
OUT = "public/assets/lid/snapshots"
os.makedirs(OUT, exist_ok=True)

STATE_CODE = {
  "Berlin":"BE","Bayern":"BY","Brandenburg":"BB","Baden-Württemberg":"BW",
  "Bremen":"HB","Hamburg":"HH","Hessen":"HE","Mecklenburg-Vorpommern":"MV",
  "Niedersachsen":"NI","Nordrhein-Westfalen":"NW","Rheinland-Pfalz":"RP",
  "Saarland":"SL","Sachsen":"SN","Sachsen-Anhalt":"ST","Schleswig-Holstein":"SH",
  "Thüringen":"TH"
}
re_general = re.compile(r"\bTeil\s+I\b", re.I)
re_state   = re.compile(r"Teil\s+II\b.*Bundesland\s+([A-Za-zÄÖÜäöü\-]+)", re.I)
re_task    = re.compile(r"Aufgabe\s+(\d+)\b", re.I)

def nrm(s): return re.sub(r"\s+"," ", s).strip()

doc = fitz.open(PDF)
section = "general"; state = None
blocks = []  # [{id, page, bbox}]

for p in range(len(doc)):
  page = doc[p]
  txt = nrm(page.get_text())
  m = re_state.search(txt)
  if m:
    name = m.group(1)
    for full,code in STATE_CODE.items():
      if full in name: state = code; break
    section = "state"
  elif re_general.search(txt):
    section = "general"; state = None

  tdict = page.get_text("dict")
  heads=[]
  for b in tdict.get("blocks", []):
    if b.get("type")!=0: continue
    for line in b.get("lines", []):
      s = "".join(sp["text"] for sp in line.get("spans", []))
      mm = re_task.search(s)
      if mm:
        xs,ys=[],[]
        for sp in line.get("spans", []):
          x0,y0,x1,y1=sp["bbox"]; xs+=[x0,x1]; ys+=[y0,y1]
        lb=(min(xs),min(ys),max(xs),max(ys))
        heads.append((int(mm.group(1)), lb))
  heads.sort(key=lambda x:x[1][1])
  for i,(num,lb) in enumerate(heads):
    y0=lb[1]; y1=heads[i+1][1][1] if i+1<len(heads) else page.rect.br.y
    bbox=(page.rect.x0,y0,page.rect.x1,y1)
    qid = f"GEN{num:03d}" if section=="general" else f"{state}{num:02d}"
    blocks.append({"id": qid, "page": p, "bbox": bbox})

def crop(page,bbox,scale=1.8):
  mat = fitz.Matrix(scale,scale)
  pix = page.get_pixmap(matrix=mat, clip=fitz.Rect(*bbox), alpha=False)
  return Image.open(io.BytesIO(pix.tobytes("png")))

index=[]
for b in blocks:
  im = crop(doc[b["page"]], b["bbox"], 1.8)
  fn = f'{b["id"]}.png'
  im.save(os.path.join(OUT, fn), "PNG", optimize=True)
  index.append({"id": b["id"], "file": f"/assets/lid/snapshots/{fn}"})

index.sort(key=lambda x: x["id"])
with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8") as f:
  json.dump(index, f, ensure_ascii=False, indent=2)

print(f"✅ {len(index)} snapshots → public/assets/lid/snapshots")
