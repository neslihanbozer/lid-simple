# -*- coding: utf-8 -*-
import os, re
import fitz  # PyMuPDF

PDF_INPUT = os.environ.get("LID_PDF", "public/data/gesamtfragenkatalog-lebenindeutschland.pdf")

def nrm_text(s:str)->str:
    return re.sub(r"\s+"," ", s).strip()

def debug_first_question():
    doc = fitz.open(PDF_INPUT)
    page = doc[0]  # First page
    
    print("=== PAGE TEXT ===")
    print(page.get_text())
    print("\n=== STRUCTURED TEXT ===")
    
    tdict = page.get_text("dict")
    for b in tdict.get("blocks", []):
        if b.get("type") == 0:  # Text block
            print(f"Block: {b}")
            for line in b.get("lines", []):
                line_text = "".join(sp["text"] for sp in line.get("spans", []))
                print(f"  Line: '{line_text}'")
                for sp in line.get("spans", []):
                    print(f"    Span: '{sp['text']}' bbox: {sp['bbox']}")

debug_first_question()
