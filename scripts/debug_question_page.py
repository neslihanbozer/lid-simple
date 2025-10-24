#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to examine a specific page with a question to see the actual patterns
"""

import fitz
import re

PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"

def main():
    print("🔍 Debugging question page patterns...")
    
    doc = fitz.open(PDF)
    
    # Check page 2 which should have the first question
    page = doc[1]  # Page 2 (0-indexed)
    print(f"\n📄 Page 2 (should have first question):")
    
    # Get all text blocks
    blocks = page.get_text("blocks")
    texts = [(b[0], b[1], b[2], b[3], b[4].strip()) for b in blocks if b[4].strip()]
    
    print(f"  Total text blocks: {len(texts)}")
    print(f"\n  All text blocks:")
    for i, (x0, y0, x1, y1, text) in enumerate(texts):
        print(f"    {i:2d}: {text}")
    
    # Look for any patterns that might be answer choices
    print(f"\n  Looking for potential answer patterns:")
    for i, (x0, y0, x1, y1, text) in enumerate(texts):
        # Look for single letters
        if len(text.strip()) == 1 and text.strip().isalpha():
            print(f"    Single letter: {text} at position {i}")
        
        # Look for patterns with letters and parentheses
        if re.search(r'[ABCD]', text):
            print(f"    Contains A/B/C/D: {text} at position {i}")
        
        # Look for numbered items
        if re.search(r'^\d+\.', text):
            print(f"    Numbered item: {text} at position {i}")
    
    # Also check page 3
    page = doc[2]  # Page 3
    print(f"\n📄 Page 3:")
    
    blocks = page.get_text("blocks")
    texts = [(b[0], b[1], b[2], b[3], b[4].strip()) for b in blocks if b[4].strip()]
    
    print(f"  Total text blocks: {len(texts)}")
    print(f"\n  All text blocks:")
    for i, (x0, y0, x1, y1, text) in enumerate(texts):
        print(f"    {i:2d}: {text}")
    
    doc.close()

if __name__ == "__main__":
    main()
