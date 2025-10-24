# -*- coding: utf-8 -*-
import json

def fix_g218():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G218 - Wiedervereinigung question
    for q in questions:
        if q['id'] == 'G218':
            print(f"Fixing G218: {q['text']}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            print(f"Current correctAnswer: {q.get('correctAnswer', 'N/A')}")
            print(f"Current explanation: {q.get('explanation', 'N/A')}")
            
            # The correct answer is B (5) - this is correct
            # But the explanation is wrong - it should be about 1990 reunification
            q['explanation'] = "Bei der Wiedervereinigung 1990 kamen 5 neue Bundesländer zur Bundesrepublik Deutschland hinzu: Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen."
            
            print(f"✅ G218: Fixed explanation - now correctly explains 1990 reunification")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_g218()
