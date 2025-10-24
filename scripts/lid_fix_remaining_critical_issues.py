# -*- coding: utf-8 -*-
import json

def fix_remaining_critical_issues():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    fixes = []
    
    for q in questions:
        qid = q['id']
        text = q['text']
        choices = [c['text'] for c in q['choices']]
        current_correct = q.get('correctAnswer', -1)
        
        # Fix G001 - First question about government criticism
        if qid == 'G001':
            print(f"Fixing G001: {text}")
            print(f"Current choices: {choices}")
            print(f"Current correct: {current_correct}")
            
            # The question asks why people can criticize the government
            # The answer should be D (Meinungsfreiheit), not A (Religionsfreiheit)
            for i, choice in enumerate(choices):
                if 'meinungsfreiheit' in choice.lower():
                    q['correctAnswer'] = i
                    q['explanation'] = "Meinungsfreiheit ist ein Grundrecht in Deutschland. Menschen dürfen ihre Meinung frei äußern, auch wenn sie kritisch gegenüber der Regierung ist. Das ist der Grund, warum Menschen offen etwas gegen die Regierung sagen dürfen."
                    fixes.append(f"✅ G001: Fixed - Meinungsfreiheit is correct, not Religionsfreiheit")
                    break
        
        # Fix G004 - Grundrechte question
        elif qid == 'G004':
            print(f"Fixing G004: {text}")
            print(f"Current choices: {choices}")
            print(f"Current correct: {current_correct}")
            
            # The question asks which right belongs to fundamental rights
            # The answer should be C (Meinungsfreiheit), not D (Selbstjustiz)
            for i, choice in enumerate(choices):
                if 'meinungsfreiheit' in choice.lower():
                    q['correctAnswer'] = i
                    q['explanation'] = "Meinungsfreiheit gehört zu den Grundrechten in Deutschland. Sie ist in Artikel 5 des Grundgesetzes garantiert. Selbstjustiz hingegen ist illegal und kein Grundrecht."
                    fixes.append(f"✅ G004: Fixed - Meinungsfreiheit is correct, not Selbstjustiz")
                    break
        
        # Fix other obvious issues
        elif 'grundrechte' in text.lower() and current_correct >= 0:
            # Check if the current correct answer is obviously wrong
            if current_correct < len(choices):
                correct_choice = choices[current_correct].lower()
                wrong_answers = ['selbstjustiz', 'faustrecht', 'waffenbesitz']
                
                for wrong in wrong_answers:
                    if wrong in correct_choice:
                        # Find the correct answer (should be a real fundamental right)
                        for i, choice in enumerate(choices):
                            choice_lower = choice.lower()
                            if any(right in choice_lower for right in ['meinungsfreiheit', 'glaubensfreiheit', 'versammlungsfreiheit', 'berufsfreiheit']):
                                q['correctAnswer'] = i
                                q['explanation'] = f"Die richtige Antwort ist ein echtes Grundrecht. {wrong.title()} ist kein Grundrecht in Deutschland."
                                fixes.append(f"✅ {qid}: Fixed Grundrechte - {choice} is correct, not {wrong}")
                                break
                        break
        
        # Fix questions about Germany's current state
        elif any(phrase in text.lower() for phrase in ['deutschland ist', 'deutschland hat', 'deutschland wird']):
            if current_correct >= 0 and current_correct < len(choices):
                correct_choice = choices[current_correct].lower()
                wrong_answers = ['diktatur', 'monarchie', 'sozialistisch']
                
                for wrong in wrong_answers:
                    if wrong in correct_choice:
                        # Find the correct answer
                        for i, choice in enumerate(choices):
                            choice_lower = choice.lower()
                            if any(right in choice_lower for right in ['bundesstaat', 'republik', 'demokratie', 'rechtsstaat']):
                                q['correctAnswer'] = i
                                q['explanation'] = f"Deutschland ist ein Bundesstaat und eine demokratische Republik. Es ist keine {wrong}."
                                fixes.append(f"✅ {qid}: Fixed Deutschland description - {choice} is correct, not {wrong}")
                                break
                        break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Applied {len(fixes)} fixes:")
    for fix in fixes:
        print(f"  {fix}")

if __name__ == "__main__":
    fix_remaining_critical_issues()
