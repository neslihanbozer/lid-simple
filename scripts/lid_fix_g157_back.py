# -*- coding: utf-8 -*-
import json

def fix_g157_back():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G157
    for q in questions:
        if q['id'] == 'G157':
            print(f"Fixing G157 back: {q['text']}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            
            # The Nazis DID establish a dictatorship in 1933 - this is historically correct
            # Find the dictatorship option
            for i, choice in enumerate(q['choices']):
                if 'diktatur' in choice['text'].lower():
                    q['correctAnswer'] = i
                    q['explanation'] = "Die Nationalsozialisten unter Adolf Hitler errichteten 1933 eine Diktatur in Deutschland. Sie zerstörten die Demokratie und errichteten ein totalitäres Regime."
                    print(f"✅ G157: Restored - Nazis did establish dictatorship (historically correct)")
                    break
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_g157_back()
