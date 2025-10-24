# -*- coding: utf-8 -*-
import os, re
import fitz  # PyMuPDF

PDF_INPUT = os.environ.get("LID_PDF", "public/data/gesamtfragenkatalog-lebenindeutschland.pdf")

def debug_single_question():
    doc = fitz.open(PDF_INPUT)
    page = doc[1]  # Page 2 (0-indexed)
    
    print("=== FULL PAGE TEXT ===")
    print(page.get_text())
    print("\n=== STRUCTURED ANALYSIS ===")
    
    tdict = page.get_text("dict")
    lines = []
    
    for b in tdict.get("blocks", []):
        if b.get("type") == 0:  # Text block
            for line in b.get("lines", []):
                line_text = "".join(sp["text"] for sp in line.get("spans", []))
                if line_text.strip():
                    lines.append(line_text.strip())
    
    print("All lines:")
    for i, line in enumerate(lines):
        print(f"{i:2d}: '{line}'")
    
    # Find first question
    for i, line in enumerate(lines):
        if "Aufgabe 1" in line:
            print(f"\n=== QUESTION 1 ANALYSIS ===")
            print(f"Found at line {i}: '{line}'")
            
            # Get next 10 lines
            question_lines = lines[i:i+10]
            for j, qline in enumerate(question_lines):
                print(f"  {j}: '{qline}'")
            break

debug_single_question()
