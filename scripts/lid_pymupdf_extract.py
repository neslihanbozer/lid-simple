# -*- coding: utf-8 -*-
import os, io, re, json, statistics
from typing import List, Tuple, Optional
from PIL import Image
import fitz  # PyMuPDF

PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"
OUT_TEXT = "public/data/questions_text.json"
OUT_IMGMAP = "public/data/images_map.json"
OUT_DIR = "public/assets/lid/export"
os.makedirs(os.path.dirname(OUT_TEXT), exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

STATE_CODE = {
    "Berlin": "BE", "Bayern": "BY", "Brandenburg": "BB", "Baden-Württemberg": "BW",
    "Bremen": "HB", "Hamburg": "HH", "Hessen": "HE", "Mecklenburg-Vorpommern": "MV",
    "Niedersachsen": "NI", "Nordrhein-Westfalen": "NW", "Rheinland-Pfalz": "RP",
    "Saarland": "SL", "Sachsen": "SN", "Sachsen-Anhalt": "ST", "Schleswig-Holstein": "SH",
    "Thüringen": "TH"
}
RE_GENERAL = re.compile(r"\bTeil\s+I\b", re.I)
RE_STATE = re.compile(r"Teil\s+II\b.*Bundesland\s+([A-Za-zÄÖÜäöü\-]+)", re.I)
RE_TASK = re.compile(r"Aufgabe\s+(\d+)\b", re.I)
RE_BILDROW = re.compile(r"Bild\s*1.*Bild\s*4", re.I)
BULLETS = ("☐", "□", "■", "◻", "▪", "–", "-")

def nrm(s): return re.sub(r"\s+", " ", s or "").strip()

def is_choice(s): return (s or "").strip().startswith(BULLETS)

def strip_bullet(s):
    t = (s or "").strip()
    for b in BULLETS:
        if t.startswith(b): return t[len(b):].strip()
    return t

def render_crop(page, rect: fitz.Rect, out_path: str, scale: float = 2.0):
    mat = fitz.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    Image.open(io.BytesIO(pix.tobytes("png"))).save(out_path, "PNG", optimize=True)

def blocks(page):
    d = page.get_text("dict")
    out = []
    for b in d.get("blocks", []):
        if b.get("type") == 0:
            for ln in b.get("lines", []):
                txt = "".join(sp["text"] for sp in ln.get("spans", []))
                xs = []
                ys = []
                for sp in ln.get("spans", []):
                    x0, y0, x1, y1 = sp["bbox"]
                    xs += [x0, x1]
                    ys += [y0, y1]
                out.append(("text", fitz.Rect(min(xs), min(ys), max(xs), max(ys)), txt))
        elif b.get("type") == 1:
            out.append(("image", fitz.Rect(*b["bbox"]), None))
    return out

def question_blocks(page) -> List[Tuple[int, fitz.Rect]]:
    bl = blocks(page)
    heads = [(int(m.group(1)), bb) for typ, bb, txt in bl if typ == "text" for m in [RE_TASK.search(txt)] if m]
    heads.sort(key=lambda x: x[1].y0)
    out = []
    for i, (num, bb) in enumerate(heads):
        y0 = bb.y0
        y1 = heads[i + 1][1].y0 if i + 1 < len(heads) else page.rect.br.y
        out.append((num, fitz.Rect(page.rect.x0, y0, page.rect.x1, y1)))
    return out

def extract_text(page, qrect):
    ls = [(bb, txt) for (typ, bb, txt) in blocks(page) if typ == "text" and bb.y0 >= qrect.y0 and bb.y1 <= qrect.y1]
    # drop heading + inline Bild-row
    ls = [(bb, txt) for (bb, txt) in ls if not RE_TASK.search(txt or "")]
    stem = []
    choices = []
    bild_row = None
    seen = False
    for bb, txt in ls:
        if RE_BILDROW.search(txt or "") or re.search(r"\bBild\s*[1-4]\b", txt or "", re.I):
            bild_row = bb
            continue
        if is_choice(txt or ""):
            seen = True
            if len(choices) < 4: choices.append(strip_bullet(txt))
        else:
            if not seen: stem.append(txt or "")
    return nrm(" ".join(stem)), [nrm(c) for c in choices[:4]], bild_row

def image_rects(page):
    rects = []
    for xref, *_ in page.get_images(full=True):
        for r in page.get_image_rects(xref) or []:
            rects.append(fitz.Rect(r))
    return rects

def pick_choices(img_rects, bild_row, qrect):
    if not bild_row: return []
    above = [r for r in img_rects if r.y1 <= bild_row.y0 - 1 and qrect.contains(r)]
    if len(above) < 4: return []
    bins = {}
    for r in above:
        key = int(r.y0 // 25)
        bins.setdefault(key, []).append(r)
    best = []
    score = (-1, -1.0)
    for arr in bins.values():
        if len(arr) < 4: continue
        arr = sorted(arr, key=lambda r: r.x0)[:4]
        areas = [(r.x1 - r.x0) * (r.y1 - r.y0) for r in arr]
        med = statistics.median(areas)
        sc = (len(arr), med)
        if sc > score: score = sc; best = arr
    return best

def biggest_stem(img_rects, used, qrect):
    rest = [r for r in img_rects if (r not in used) and qrect.contains(r)]
    filt = []
    for r in rest:
        w = r.x1 - r.x0
        h = r.y1 - r.y0
        if w >= 18 and h >= 18 and 0.35 <= w / h <= 2.8: filt.append((r, w * h))
    filt.sort(key=lambda x: x[1], reverse=True)
    if not filt: return None
    if len(filt) == 1 or filt[0][1] > (filt[1][1] * 1.3): return filt[0][0]
    return None

def fname(kat, num_str, stem_ok, choices_ok, slot):
    return f"{kat}_{num_str}_{'sorukismi' if stem_ok else 'xxx'}_{'siklar' if choices_ok else 'xxxx'}_{slot}.png"

doc = fitz.open(PDF)
section = "general"
state = None
Q = []
IM = []

for p in range(len(doc)):
    page = doc[p]
    txt = nrm(page.get_text())
    ms = RE_STATE.search(txt)
    if ms:
        name = ms.group(1)
        st = None
        for full, code in STATE_CODE.items():
            if full in name: st = code; break
        section = "state"
        state = st or state
    elif RE_GENERAL.search(txt):
        section = "general"
        state = None

    for num, qrect in question_blocks(page):
        qid = f"GEN{num:03d}" if section == "general" else f"{state}{num:02d}"
        stem, choices, bild_row = extract_text(page, qrect)
        Q.append({
            "id": qid, "section": section, "state": state if section == "state" else None,
            "number": num, "text": stem,
            "choices": [{"id": k, "text": v} for k, v in zip(["A", "B", "C", "D"], choices)]
        })
        rects = image_rects(page)
        row = pick_choices(rects, bild_row, qrect)
        has_choices = len(row) == 4
        kat, num_str = ("GEN", qid[3:]) if qid.startswith("GEN") else (qid[:2], qid[2:])
        # save A-D
        labels = ["A", "B", "C", "D"]
        for lab, r in zip(labels, row):
            out = os.path.join(OUT_DIR, fname(kat, num_str, False, True, lab))
            render_crop(page, r, out, scale=2.0)
            IM.append({"id": qid, "slot": lab, "path": f"/assets/lid/export/{os.path.basename(out)}"})
        # save STEM
        stem_rect = biggest_stem(rects, set(row), qrect)
        if stem_rect:
            out = os.path.join(OUT_DIR, fname(kat, num_str, True, has_choices, "STEM"))
            render_crop(page, stem_rect, out, scale=2.0)
            IM.append({"id": qid, "slot": "STEM", "path": f"/assets/lid/export/{os.path.basename(out)}"})

with open(OUT_TEXT, "w", encoding="utf-8") as f: json.dump({"questions": Q}, f, ensure_ascii=False, indent=2)
with open(OUT_IMGMAP, "w", encoding="utf-8") as f: json.dump({"images": IM}, f, ensure_ascii=False, indent=2)
print(f"✅ Extracted {len(Q)} questions; image slots: {len(IM)} → {OUT_DIR}")