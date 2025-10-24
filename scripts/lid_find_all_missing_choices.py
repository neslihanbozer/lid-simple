# -*- coding: utf-8 -*-
import json

def find_all_missing_choices():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"🔍 Finding all questions with missing choices...\n")
    
    missing_questions = []
    
    for q in questions:
        qid = q['id']
        choices = [c['text'] for c in q['choices']]
        
        # Check if any choice contains "[Seçenek X eksik]"
        if any("[Seçenek" in choice and "eksik" in choice for choice in choices):
            missing_questions.append({
                'id': qid,
                'number': q.get('numberInCatalog', '?'),
                'text': q['text'][:100] + "...",
                'choices': choices
            })
    
    print(f"Found {len(missing_questions)} questions with missing choices:\n")
    
    for item in missing_questions:
        print(f"📋 {item['id']} (Question {item['number']}):")
        print(f"  Text: {item['text']}")
        print(f"  Choices: {item['choices']}")
        print()
    
    return missing_questions

if __name__ == "__main__":
    find_all_missing_choices()
