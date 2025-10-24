#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to see what text patterns are actually in the PDF
"""

import fitz
import re

PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"

def main():
    print("🔍 Debugging PDF text patterns...")
    
    doc = fitz.open(PDF)
    
    # Check first 10 pages for patterns
    for pno in range(min(10, len(doc))):
        page = doc[pno]
        print(f"\n📄 Page {pno + 1}:")
        
        # Get all text blocks
        blocks = page.get_text("blocks")
        texts = [(b[0], b[1], b[2], b[3], b[4].strip()) for b in blocks if b[4].strip()]
        
        # Look for patterns
        choice_patterns = []
        question_patterns = []
        
        for (x0, y0, x1, y1, text) in texts:
            # Look for A), B), C), D) patterns
            if re.search(r'[ABCD]\)', text) or re.search(r'[ABCD]\s*\)', text):
                choice_patterns.append((x0, y0, x1, y1, text))
            
            # Look for "Frage" or "Aufgabe" patterns
            if re.search(r'Frage|Aufgabe|Question', text, re.I):
                question_patterns.append((x0, y0, x1, y1, text))
        
        print(f"  Choice patterns found: {len(choice_patterns)}")
        for pattern in choice_patterns[:3]:  # Show first 3
            print(f"    {pattern[4]}")
        
        print(f"  Question patterns found: {len(question_patterns)}")
        for pattern in question_patterns[:3]:  # Show first 3
            print(f"    {pattern[4]}")
        
        # Show all text blocks for first page
        if pno == 0:
            print(f"\n  All text blocks on page 1:")
            for i, (x0, y0, x1, y1, text) in enumerate(texts[:10]):
                print(f"    {i}: {text}")
    
    doc.close()

if __name__ == "__main__":
    main()
