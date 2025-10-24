# -*- coding: utf-8 -*-
import json
import re

def clean_text(text):
    """Clean concatenated text from PDF parsing"""
    if not text:
        return text
    
    # Fix common concatenation issues
    text = re.sub(r'\bBu\s+ndesstaat\b', 'Bundesstaat', text)
    text = re.sub(r'\bGehaltsvo\s+rstellungen\b', 'Gehaltsvorstellungen', text)
    text = re.sub(r'\be\s+rlaubt\b', 'erlaubt', text)
    text = re.sub(r'\bMieter\s+innen\b', 'Mieterinnen', text)
    text = re.sub(r'\bBewohner\s+innen\b', 'Bewohnerinnen', text)
    text = re.sub(r'\bÄrztin\s+/zum\s+Arzt\s+\.\b', 'Ärztin/zum Arzt.', text)
    
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text

def fix_specific_questions():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Fix question 27 (G027) - Deutschland ist...
    for q in questions:
        if q['id'] == 'G027':
            print(f"Fixing question {q['id']}: {q['text']}")
            
            # Clean text
            q['text'] = clean_text(q['text'])
            for choice in q['choices']:
                choice['text'] = clean_text(choice['text'])
            
            # Fix correct answer: B (Bundesstaat) is correct, not C (Diktatur)
            q['correctAnswer'] = 1  # B (index 1)
            
            # Fix explanation
            q['explanation'] = "Deutschland ist ein Bundesstaat. Das bedeutet, dass die Macht zwischen dem Bund (Bundesregierung) und den Ländern (Länderregierungen) aufgeteilt ist. Deutschland ist eine demokratische Republik, keine Diktatur."
            
            print(f"✅ Fixed question {q['id']}: correctAnswer={q['correctAnswer']}, explanation updated")
            break
    
    # Fix other common issues
    fixed_count = 0
    for q in questions:
        original_text = q['text']
        original_choices = [choice['text'] for choice in q['choices']]
        
        # Clean text
        q['text'] = clean_text(q['text'])
        for choice in q['choices']:
            choice['text'] = clean_text(choice['text'])
        
        # Check if anything changed
        if (q['text'] != original_text or 
            any(choice['text'] != orig for choice, orig in zip(q['choices'], original_choices))):
            fixed_count += 1
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Fixed {fixed_count} questions with text concatenation issues")
    print("✅ Fixed question 27: correctAnswer and explanation")

if __name__ == "__main__":
    fix_specific_questions()
