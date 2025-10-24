# -*- coding: utf-8 -*-
import json

def fix_bundeslaender_question():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G024 - Bundesländer question
    for q in questions:
        if q['id'] == 'G024':
            print(f"Fixing G024: {q['text']}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            print(f"Current correctAnswer: {q.get('correctAnswer', 'N/A')}")
            print(f"Current explanation: {q.get('explanation', 'N/A')}")
            
            # The correct answer should be C (16), not D (17)
            # Germany has 16 federal states (Bundesländer)
            q['correctAnswer'] = 2  # C (index 2)
            q['explanation'] = "Deutschland besteht aus 16 Bundesländern. Jedes Bundesland hat eigene Kompetenzen in Bildung, Kultur und innerer Sicherheit."
            
            print(f"✅ G024: Fixed - C (16) is correct, not D (17)")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_bundeslaender_question()
