# -*- coding: utf-8 -*-
import json

def fix_question_7():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G007 - Grundrechte question
    for q in questions:
        if q['id'] == 'G007':
            print(f"Fixing G007: {q['text']}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            print(f"Current correctAnswer: {q.get('correctAnswer', 'N/A')}")
            print(f"Current explanation: {q.get('explanation', 'N/A')}")
            
            # The correct answer should be A (Glaubens- und Gewissensfreiheit)
            # This is a fundamental right guaranteed by the German constitution
            # Arbeit (work) is NOT a fundamental right in the German constitution
            q['correctAnswer'] = 0  # A - Glaubens- und Gewissensfreiheit
            
            # Fix the explanation to be specific to this question
            q['explanation'] = "Glaubens- und Gewissensfreiheit gehört zu den Grundrechten, die nach der deutschen Verfassung garantiert werden. Dies ist in Artikel 4 des Grundgesetzes verankert. Arbeit hingegen ist kein Grundrecht."
            
            print(f"✅ G007: Fixed - A (Glaubens- und Gewissensfreiheit) is correct, not C (Arbeit)")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_question_7()
