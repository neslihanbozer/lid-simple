# -*- coding: utf-8 -*-
import json

def comprehensive_fix_all_answers():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"🔍 Comprehensive fix for all {len(questions)} questions...\n")
    
    fixes = []
    
    for q in questions:
        qid = q['id']
        text = q['text'].lower()
        choices = [c['text'] for c in q['choices']]
        current_correct = q.get('correctAnswer', -1)
        
        # Skip if no correct answer set
        if current_correct < 0 or current_correct >= len(choices):
            continue
        
        current_choice = choices[current_correct].lower()
        
        # Pattern 1: Grundrechte questions
        if 'grundrechte' in text:
            wrong_answers = ['selbstjustiz', 'faustrecht', 'waffenbesitz', 'zwangsarbeit']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct fundamental right
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['meinungsfreiheit', 'glaubensfreiheit', 'versammlungsfreiheit', 'berufsfreiheit', 'asyl']):
                        q['correctAnswer'] = i
                        q['explanation'] = f"Die richtige Antwort ist ein echtes Grundrecht. {current_choice.title()} ist kein Grundrecht in Deutschland."
                        fixes.append(f"✅ {qid}: Fixed Grundrechte - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 2: Deutschland ist/hat questions
        elif any(phrase in text for phrase in ['deutschland ist', 'deutschland hat', 'deutschland wird']):
            wrong_answers = ['diktatur', 'monarchie', 'sozialistisch', 'totalitär']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct answer
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['bundesstaat', 'republik', 'demokratie', 'rechtsstaat']):
                        q['correctAnswer'] = i
                        q['explanation'] = f"Deutschland ist ein Bundesstaat und eine demokratische Republik. Es ist keine {wrong}."
                        fixes.append(f"✅ {qid}: Fixed Deutschland - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 3: Meinungsfreiheit questions
        elif 'meinungsfreiheit' in text:
            wrong_answers = ['nazi', 'verboten', 'zensur', 'einschränkung']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct answer about freedom of expression
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['internet', 'äußern', 'kritik', 'meinung']):
                        q['correctAnswer'] = i
                        q['explanation'] = "Meinungsfreiheit bedeutet, dass Menschen ihre Meinung frei äußern können, auch im Internet oder bei Kritik an der Regierung."
                        fixes.append(f"✅ {qid}: Fixed Meinungsfreiheit - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 4: Demokratie questions
        elif 'demokratie' in text or 'demokratisch' in text:
            wrong_answers = ['diktatur', 'zensur', 'totalitär', 'autoritär']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct democratic feature
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['wahlen', 'meinungsfreiheit', 'parteien', 'freiheit']):
                        q['correctAnswer'] = i
                        q['explanation'] = "Demokratie zeichnet sich durch freie Wahlen, Meinungsfreiheit und verschiedene Parteien aus."
                        fixes.append(f"✅ {qid}: Fixed Demokratie - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 5: Wahlen questions
        elif 'wahlen' in text or 'wählen' in text:
            wrong_answers = ['zwang', 'pflicht', 'gezwungen']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct answer about free elections
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['frei', 'ohne zwang', 'nicht beeinflusst', 'geheim']):
                        q['correctAnswer'] = i
                        q['explanation'] = "Freie Wahlen bedeuten, dass Wähler ohne Zwang, Beeinflussung oder Nachteile ihre Stimme abgeben können."
                        fixes.append(f"✅ {qid}: Fixed Wahlen - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 6: Rechtsstaat questions
        elif 'rechtsstaat' in text:
            wrong_answers = ['willkür', 'diktatur', 'totalitär']
            if any(wrong in current_choice for wrong in wrong_answers):
                # Find the correct answer about rule of law
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if any(right in choice_lower for right in ['gesetze', 'recht', 'verfassung', 'grundgesetz']):
                        q['correctAnswer'] = i
                        q['explanation'] = "Ein Rechtsstaat bedeutet, dass alle Menschen und der Staat sich an die Gesetze halten müssen."
                        fixes.append(f"✅ {qid}: Fixed Rechtsstaat - {choice} is correct, not {current_choice}")
                        break
        
        # Pattern 7: Check for obviously wrong answers in any question
        else:
            obviously_wrong = ['diktatur', 'zwangsarbeit', 'nazi', 'faschismus', 'totalitär', 'selbstjustiz', 'faustrecht']
            if any(wrong in current_choice for wrong in obviously_wrong):
                # Try to find a reasonable correct answer
                for i, choice in enumerate(choices):
                    choice_lower = choice.lower()
                    if not any(wrong in choice_lower for wrong in obviously_wrong):
                        # This choice doesn't contain obviously wrong terms
                        q['correctAnswer'] = i
                        q['explanation'] = f"Die richtige Antwort ist {choice}. {current_choice.title()} ist nicht korrekt."
                        fixes.append(f"✅ {qid}: Fixed obvious wrong answer - {choice} is correct, not {current_choice}")
                        break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Applied {len(fixes)} comprehensive fixes:")
    for fix in fixes[:20]:  # Show first 20 fixes
        print(f"  {fix}")
    
    if len(fixes) > 20:
        print(f"  ... and {len(fixes) - 20} more fixes")

if __name__ == "__main__":
    comprehensive_fix_all_answers()
