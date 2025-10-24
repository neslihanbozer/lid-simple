# -*- coding: utf-8 -*-
import os, re
import fitz  # PyMuPDF

PDF_INPUT = os.environ.get("LID_PDF", "public/data/gesamtfragenkatalog-lebenindeutschland.pdf")

def find_questions():
    doc = fitz.open(PDF_INPUT)
    
    for p in range(len(doc)):
        page = doc[p]
        txt = page.get_text()
        if "Aufgabe 1" in txt:
            print(f"Found questions starting at page {p+1}")
            print("=== PAGE TEXT ===")
            print(txt[:1000])  # First 1000 chars
            break

find_questions()
