# -*- coding: utf-8 -*-
import json

def fix_wrong_answers():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    fixes = []
    
    for q in questions:
        qid = q['id']
        text = q['text'].lower()
        choices = [c['text'] for c in q['choices']]
        current_correct = q.get('correctAnswer', -1)
        
        # Fix G014 - Meinungsfreiheit question
        if qid == 'G014':
            # Correct answer should be A (Internet expression), not B (Nazi symbols)
            q['correctAnswer'] = 0  # A
            q['explanation'] = "Meinungsfreiheit bedeutet, dass Menschen ihre Meinung frei äußern können, auch im Internet. Nazi-, Hamas- oder Islamischer Staat-Symbole zu tragen ist jedoch verboten und kein Ausdruck der Meinungsfreiheit."
            fixes.append(f"✅ G014: Fixed Meinungsfreiheit - A (Internet) is correct, not B (Nazi symbols)")
        
        # Fix G022 - Staatsform question  
        elif qid == 'G022':
            # Find Bundesstaat in choices
            for i, choice in enumerate(choices):
                if 'bundesstaat' in choice.lower():
                    q['correctAnswer'] = i
                    break
            q['explanation'] = "Deutschland ist ein Bundesstaat. Das bedeutet, dass die Macht zwischen dem Bund (Bundesregierung) und den Ländern (Länderregierungen) aufgeteilt ist. Deutschland ist eine demokratische Republik, keine Diktatur."
            fixes.append(f"✅ G022: Fixed Staatsform - Bundesstaat is correct, not Diktatur")
        
        # Fix G030 - Demokratie question
        elif qid == 'G030':
            # Find Pressezensur in choices - this should be the WRONG answer, not correct
            for i, choice in enumerate(choices):
                if 'pressezensur' in choice.lower():
                    # This is the wrong answer, so find the correct one
                    # Look for other options that are democratic features
                    for j, other_choice in enumerate(choices):
                        if j != i and any(word in other_choice.lower() for word in ['wahlen', 'meinungsfreiheit', 'parteien', 'demokratie']):
                            q['correctAnswer'] = j
                            break
                    break
            q['explanation'] = "Pressezensur ist kein Merkmal unserer Demokratie. Demokratie zeichnet sich durch freie Wahlen, Meinungsfreiheit, Pressefreiheit und verschiedene Parteien aus."
            fixes.append(f"✅ G030: Fixed Demokratie - Pressezensur is wrong, other democratic features are correct")
        
        # Fix G119 - Wahlen question
        elif qid == 'G119':
            # Find the choice about freedom from coercion
            for i, choice in enumerate(choices):
                if 'ohne zwang' in choice.lower() or 'nicht beeinflusst' in choice.lower():
                    q['correctAnswer'] = i
                    break
            q['explanation'] = "Freie Wahlen bedeuten, dass Wählerinnen und Wähler ohne Zwang, Beeinflussung oder Nachteile ihre Stimme abgeben können. Niemand darf gezwungen werden zu wählen oder eine bestimmte Partei zu wählen."
            fixes.append(f"✅ G119: Fixed Wahlen - Freedom from coercion is correct")
        
        # Fix G157 - Nationalsozialisten question
        elif qid == 'G157':
            # This is a historical question - the Nazis DID establish a dictatorship
            # But we need to check if this is asking what they established vs what they destroyed
            if 'errichteten' in text:
                # They established a dictatorship (this is historically correct)
                # But let's make sure the explanation is clear
                q['explanation'] = "Die Nationalsozialisten unter Adolf Hitler errichteten 1933 eine Diktatur in Deutschland. Sie zerstörten die Demokratie und errichteten ein totalitäres Regime."
                fixes.append(f"✅ G157: Confirmed - Nazis did establish a dictatorship (historically correct)")
        
        # Fix other obvious issues
        elif 'deutschland ist' in text and current_correct == 2:
            # Check if C is Diktatur
            if current_correct < len(choices) and 'diktatur' in choices[current_correct].lower():
                # Find Bundesstaat or Republik
                for i, choice in enumerate(choices):
                    if 'bundesstaat' in choice.lower() or 'republik' in choice.lower():
                        q['correctAnswer'] = i
                        q['explanation'] = "Deutschland ist ein Bundesstaat und eine demokratische Republik. Es ist keine Diktatur."
                        fixes.append(f"✅ {qid}: Fixed 'Deutschland ist' - Bundesstaat/Republik correct, not Diktatur")
                        break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Applied {len(fixes)} fixes:")
    for fix in fixes:
        print(f"  {fix}")

if __name__ == "__main__":
    fix_wrong_answers()
