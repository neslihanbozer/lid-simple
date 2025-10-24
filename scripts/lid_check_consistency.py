# -*- coding: utf-8 -*-
import json
import re

def check_consistency():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"🔍 Checking consistency for {len(questions)} questions...\n")
    
    inconsistencies = []
    
    for q in questions:
        qid = q['id']
        text = q['text']
        choices = [c['text'] for c in q['choices']]
        correct_idx = q.get('correctAnswer', -1)
        explanation = q.get('explanation', '')
        
        if correct_idx < 0 or correct_idx >= len(choices):
            continue
        
        correct_choice = choices[correct_idx]
        
        # Check for number inconsistencies
        if 'wie viele' in text.lower() or 'anzahl' in text.lower():
            # Extract numbers from explanation
            explanation_numbers = re.findall(r'\b(\d+)\b', explanation)
            choice_numbers = re.findall(r'\b(\d+)\b', correct_choice)
            
            if explanation_numbers and choice_numbers:
                exp_num = explanation_numbers[0]
                choice_num = choice_numbers[0]
                
                if exp_num != choice_num:
                    inconsistencies.append({
                        'id': qid,
                        'text': text[:80] + "...",
                        'correct_choice': correct_choice,
                        'explanation_numbers': explanation_numbers,
                        'choice_numbers': choice_numbers,
                        'issue': f"Explanation says {exp_num} but correct answer is {choice_num}"
                    })
        
        # Check for obvious wrong answers
        wrong_answers = ['diktatur', 'zwangsarbeit', 'nazi', 'faschismus', 'selbstjustiz', 'faustrecht']
        if any(wrong in correct_choice.lower() for wrong in wrong_answers):
            # Check if this is about Germany's current state
            if any(phrase in text.lower() for phrase in ['deutschland ist', 'deutschland hat', 'deutschland wird']):
                inconsistencies.append({
                    'id': qid,
                    'text': text[:80] + "...",
                    'correct_choice': correct_choice,
                    'issue': f"Obviously wrong answer: {correct_choice}"
                })
    
    # Print results
    if inconsistencies:
        print(f"❌ Found {len(inconsistencies)} inconsistencies:")
        for item in inconsistencies[:10]:  # Show first 10
            print(f"  {item['id']}: {item['text']}")
            print(f"    Correct: {item['correct_choice']}")
            print(f"    Issue: {item['issue']}")
            print()
        
        if len(inconsistencies) > 10:
            print(f"  ... and {len(inconsistencies) - 10} more inconsistencies")
    else:
        print("✅ No inconsistencies found!")

if __name__ == "__main__":
    check_consistency()
