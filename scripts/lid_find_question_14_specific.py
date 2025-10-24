# -*- coding: utf-8 -*-
import fitz  # PyMuPDF
import re

PDF_PATH = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"

def find_question_14_specific():
    doc = fitz.open(PDF_PATH)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        
        # Look specifically for "Meinungsfreiheit" or "Aufgabe 14"
        if "Meinungsfreiheit" in text or "Aufgabe 14" in text:
            print(f"=== PAGE {page_num + 1} ===")
            print(text)
            print("\n" + "="*50 + "\n")
            
            # Get structured text to see the exact layout
            blocks = page.get_text("dict")
            for block in blocks.get("blocks", []):
                if block.get("type") == 0:  # Text block
                    for line in block.get("lines", []):
                        line_text = "".join(span["text"] for span in line.get("spans", []))
                        if "Meinungsfreiheit" in line_text or "14" in line_text or "Passanten" in line_text:
                            print(f"LINE: {line_text}")

if __name__ == "__main__":
    find_question_14_specific()
