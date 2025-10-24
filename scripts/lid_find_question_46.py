# -*- coding: utf-8 -*-
import fitz  # PyMuPDF
import re

PDF_PATH = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"

def find_question_46():
    doc = fitz.open(PDF_PATH)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        
        # Look for "Aufgabe 46" or similar patterns
        if "Aufgabe 46" in text or "46" in text:
            print(f"=== PAGE {page_num + 1} ===")
            print(text)
            print("\n" + "="*50 + "\n")
            
            # Also get structured text
            blocks = page.get_text("dict")
            for block in blocks.get("blocks", []):
                if block.get("type") == 0:  # Text block
                    for line in block.get("lines", []):
                        line_text = "".join(span["text"] for span in line.get("spans", []))
                        if "46" in line_text or "deutsche Staat" in line_text:
                            print(f"LINE: {line_text}")

if __name__ == "__main__":
    find_question_46()
