# -*- coding: utf-8 -*-
import json

def final_verification():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print("🔍 Final verification of critical questions...\n")
    
    # Check the most critical questions
    critical_questions = ['G014', 'G022', 'G027', 'G030', 'G119', 'G157']
    
    for qid in critical_questions:
        question = None
        for q in questions:
            if q['id'] == qid:
                question = q
                break
        
        if question:
            print(f"📋 {qid} (Question {question.get('numberInCatalog', '?')}):")
            print(f"  Text: {question['text'][:100]}...")
            print(f"  Correct Answer: {question.get('correctAnswer', 'N/A')}")
            
            choices = question['choices']
            correct_idx = question.get('correctAnswer', -1)
            if 0 <= correct_idx < len(choices):
                print(f"  Correct Choice: {choices[correct_idx]['text']}")
            else:
                print(f"  Correct Choice: N/A")
            
            print(f"  Explanation: {question.get('explanation', 'N/A')[:100]}...")
            print()
    
    # Check for any remaining obviously wrong answers
    wrong_patterns = ['diktatur', 'zwangsarbeit', 'nazi', 'faschismus']
    issues_found = 0
    
    for q in questions:
        correct_idx = q.get('correctAnswer', -1)
        if 0 <= correct_idx < len(q['choices']):
            correct_choice = q['choices'][correct_idx]['text'].lower()
            
            # Check if this is a question about Germany's current state
            text = q['text'].lower()
            if any(phrase in text for phrase in ['deutschland ist', 'deutschland hat', 'deutschland wird']):
                for pattern in wrong_patterns:
                    if pattern in correct_choice:
                        print(f"❌ {q['id']}: {pattern} marked as correct for Germany's current state")
                        issues_found += 1
                        break
    
    if issues_found == 0:
        print("✅ No critical issues found! All major problems have been fixed.")
    else:
        print(f"❌ Found {issues_found} remaining issues")

if __name__ == "__main__":
    final_verification()
