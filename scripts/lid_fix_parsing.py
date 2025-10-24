# -*- coding: utf-8 -*-
import json
import re

def clean_text(text):
    """Clean concatenated text from PDF parsing"""
    if not text:
        return text
    
    # Fix common concatenation issues
    text = re.sub(r'\bkan\s+n\b', 'kann', text)
    text = re.sub(r'\bSy\s+mbole\b', 'Symbole', text)
    text = re.sub(r'\bäuß\s+ern\s+da\s+rf\b', 'äußern darf', text)
    text = re.sub(r'\bRe\s+gierung\b', 'Regierung', text)
    text = re.sub(r'\bwide\s+rspreche\b', 'widerspreche', text)
    text = re.sub(r'\bAuf\s+gabe\s+\d+\b', '', text)  # Remove next question headers
    text = re.sub(r'\bWas\s+verbietet\s+das\s+deutsche\s+Grundgesetz\?\b', '', text)  # Remove next question
    
    # Fix other common issues
    text = re.sub(r'\be\s+in\b', 'ein', text)
    text = re.sub(r'\bme\s+ine\b', 'meine', text)
    text = re.sub(r'\bMe\s+inung\b', 'Meinung', text)
    text = re.sub(r'\bwi\s+derspreche\b', 'widerspreche', text)
    text = re.sub(r'\bverteidig\s+en\b', 'verteidigen', text)
    text = re.sub(r'\bRichter\s+in\b', 'Richterin', text)
    text = re.sub(r'\bRichter\s+s\b', 'Richters', text)
    text = re.sub(r'\bBürger\s+innen\b', 'Bürgerinnen', text)
    text = re.sub(r'\bBürger\s+n\b', 'Bürgern', text)
    
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text

def fix_question(question):
    """Fix a single question"""
    # Clean question text
    question['text'] = clean_text(question['text'])
    
    # Clean choices
    for choice in question['choices']:
        choice['text'] = clean_text(choice['text'])
        
        # Fix empty choices that should have content
        if not choice['text'] or choice['text'] in ['', '']:
            # Try to infer from context or mark as missing
            choice['text'] = f"[Seçenek {choice['id']} eksik]"
    
    return question

# Load questions
with open('public/lid/general.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Processing {len(questions)} questions...")

# Fix each question
fixed_count = 0
for i, question in enumerate(questions):
    original_text = question['text']
    original_choices = [choice['text'] for choice in question['choices']]
    
    question = fix_question(question)
    
    # Check if anything changed
    if (question['text'] != original_text or 
        any(choice['text'] != orig for choice, orig in zip(question['choices'], original_choices))):
        fixed_count += 1
        if i < 20:  # Show first 20 fixes
            print(f"Fixed question {i+1}: {question['id']}")

# Save fixed questions
with open('public/lid/general.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"✅ Fixed {fixed_count} questions with parsing issues")
