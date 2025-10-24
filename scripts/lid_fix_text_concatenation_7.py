# -*- coding: utf-8 -*-
import json
import re

def fix_text_concatenation_7():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G007 and fix text concatenation
    for q in questions:
        if q['id'] == 'G007':
            print(f"Fixing text concatenation for G007...")
            
            # Fix the concatenated text in choice A
            for choice in q['choices']:
                if choice['id'] == 'A':
                    # Fix "Glaubens - und Gewissensfreihei t" -> "Glaubens- und Gewissensfreiheit"
                    choice['text'] = re.sub(r'Glaubens\s*-\s*und\s*Gewissensfreihei\s*t', 'Glaubens- und Gewissensfreiheit', choice['text'])
                    print(f"Fixed choice A: {choice['text']}")
                    break
            
            print(f"✅ G007: Fixed text concatenation")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_text_concatenation_7()
