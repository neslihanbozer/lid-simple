# -*- coding: utf-8 -*-
import json

def fix_question_46():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G046 - German state tasks question
    for q in questions:
        if q['id'] == 'G046':
            print(f"Fixing G046: {q['text']}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            
            # The question text already contains the answers, we need to extract them
            # The correct answer should be "Er baut Straßen und Schulen" (builds roads and schools)
            # This is a typical state task, while the others are not
            
            # Fix the choices
            q['choices'][0]['text'] = "Er baut Straßen und Schulen."
            q['choices'][1]['text'] = "Er verkauft Lebensmittel und Kleidung."
            q['choices'][2]['text'] = "Er versorgt alle Einwohnerinnen und Einwohner kostenlos mit Zeitungen."
            q['choices'][3]['text'] = "Er produziert Autos und Busse."
            
            # The correct answer is A (builds roads and schools) - this is a typical state task
            q['correctAnswer'] = 0  # A
            q['explanation'] = "Der deutsche Staat baut Straßen und Schulen. Dies sind typische staatliche Aufgaben. Der Staat verkauft normalerweise keine Lebensmittel oder Kleidung, versorgt nicht kostenlos mit Zeitungen und produziert keine Autos oder Busse."
            
            print(f"✅ G046: Fixed - A (builds roads and schools) is correct")
            print(f"New choices: {[c['text'] for c in q['choices']]}")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_question_46()
