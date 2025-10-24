# -*- coding: utf-8 -*-
import json

def fix_remaining_issues():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    fixes = []
    
    for q in questions:
        qid = q['id']
        text = q['text'].lower()
        choices = [c['text'] for c in q['choices']]
        
        # Fix G022 - Staatsform question (still wrong)
        if qid == 'G022':
            print(f"Fixing G022: {q['text']}")
            print(f"Current choices: {choices}")
            print(f"Current correct: {q.get('correctAnswer', 'N/A')}")
            
            # Find the correct answer (Bundesstaat or Republik)
            for i, choice in enumerate(choices):
                choice_lower = choice.lower()
                if 'bundesstaat' in choice_lower or 'republik' in choice_lower or 'demokratie' in choice_lower:
                    q['correctAnswer'] = i
                    q['explanation'] = "Deutschland ist ein Bundesstaat und eine demokratische Republik. Es ist keine Diktatur, keine Monarchie und kein sozialistischer Staat."
                    fixes.append(f"✅ G022: Fixed Staatsform - {choice} is correct")
                    break
        
        # Fix G119 - Wahlen question (still has coercion issue)
        elif qid == 'G119':
            print(f"Fixing G119: {q['text']}")
            print(f"Current choices: {choices}")
            print(f"Current correct: {q.get('correctAnswer', 'N/A')}")
            
            # Find the choice that mentions freedom from coercion
            for i, choice in enumerate(choices):
                choice_lower = choice.lower()
                if 'nicht beeinflusst' in choice_lower or 'keine nachteile' in choice_lower or 'nicht gezwungen' in choice_lower:
                    q['correctAnswer'] = i
                    q['explanation'] = "Freie Wahlen bedeuten, dass Wählerinnen und Wähler ohne Zwang, Beeinflussung oder Nachteile ihre Stimme abgeben können. Niemand darf gezwungen werden zu wählen oder eine bestimmte Partei zu wählen."
                    fixes.append(f"✅ G119: Fixed Wahlen - {choice} is correct")
                    break
        
        # Fix G157 - This is actually correct historically
        elif qid == 'G157':
            # The Nazis DID establish a dictatorship in 1933 - this is historically correct
            q['explanation'] = "Die Nationalsozialisten unter Adolf Hitler errichteten 1933 eine Diktatur in Deutschland. Sie zerstörten die Demokratie und errichteten ein totalitäres Regime."
            fixes.append(f"✅ G157: Confirmed - Nazis did establish dictatorship (historically correct)")
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Applied {len(fixes)} fixes:")
    for fix in fixes:
        print(f"  {fix}")

if __name__ == "__main__":
    fix_remaining_issues()
