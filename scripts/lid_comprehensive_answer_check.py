# -*- coding: utf-8 -*-
import json

def comprehensive_check():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"🔍 Comprehensive analysis of {len(questions)} questions...\n")
    
    # Categories of questions to check
    categories = {
        'Deutschland ist': [],
        'Meinungsfreiheit': [],
        'Demokratie': [],
        'Wahlen': [],
        'Grundgesetz': [],
        'Geschichte': [],
        'Rechtsstaat': [],
        'Bundesländer': [],
        'EU': [],
        'Gesellschaft': []
    }
    
    # Analyze each question
    for q in questions:
        qid = q['id']
        text = q['text'].lower()
        choices = [c['text'].lower() for c in q['choices']]
        correct_idx = q.get('correctAnswer', -1)
        correct_choice = choices[correct_idx] if correct_idx >= 0 else "N/A"
        
        # Categorize questions
        if 'deutschland ist' in text:
            categories['Deutschland ist'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif 'meinungsfreiheit' in text:
            categories['Meinungsfreiheit'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif 'demokratie' in text or 'demokratisch' in text:
            categories['Demokratie'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif 'wahlen' in text or 'wählen' in text:
            categories['Wahlen'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif 'grundgesetz' in text:
            categories['Grundgesetz'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif any(word in text for word in ['hitler', 'nazi', 'nationalsozialist', '1933', 'krieg']):
            categories['Geschichte'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif 'rechtsstaat' in text:
            categories['Rechtsstaat'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif any(word in text for word in ['bundesland', 'land', 'länder']):
            categories['Bundesländer'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif any(word in text for word in ['eu', 'europa', 'europäisch']):
            categories['EU'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
        elif any(word in text for word in ['gesellschaft', 'leben', 'kultur', 'tradition']):
            categories['Gesellschaft'].append({
                'id': qid, 'text': q['text'][:80] + "...", 
                'correct': correct_choice, 'idx': correct_idx
            })
    
    # Print analysis for each category
    for category, questions in categories.items():
        if questions:
            print(f"📋 {category} ({len(questions)} questions):")
            
            # Check for obviously wrong answers
            wrong_answers = ['diktatur', 'zwangsarbeit', 'nazi', 'faschismus', 'totalitär', 'autoritär', 'unterdrückung', 'zensur']
            
            for q in questions:
                issues = []
                
                # Check if correct answer contains obviously wrong terms
                for wrong in wrong_answers:
                    if wrong in q['correct']:
                        issues.append(f"❌ Wrong answer: '{wrong}' in correct choice")
                
                # Category-specific checks
                if category == 'Deutschland ist':
                    if 'diktatur' in q['correct']:
                        issues.append("❌ Deutschland is not a dictatorship")
                    if 'bundesstaat' not in q['correct'] and 'republik' not in q['correct']:
                        issues.append("⚠️  Should mention Bundesstaat or Republik")
                
                elif category == 'Meinungsfreiheit':
                    if 'nazi' in q['correct'] or 'verboten' in q['correct']:
                        issues.append("❌ Nazi symbols are not freedom of expression")
                    if 'internet' not in q['correct'] and 'äußern' not in q['correct']:
                        issues.append("⚠️  Should mention free expression")
                
                elif category == 'Demokratie':
                    if 'zensur' in q['correct'] or 'diktatur' in q['correct']:
                        issues.append("❌ Censorship and dictatorship are not democratic")
                
                elif category == 'Wahlen':
                    if 'zwang' in q['correct']:
                        issues.append("❌ Coercion is not free elections")
                
                if issues:
                    print(f"  {q['id']}: {q['text']}")
                    print(f"    Correct: {q['correct']}")
                    for issue in issues:
                        print(f"    {issue}")
                    print()
    
    # Summary
    total_issues = sum(len([q for q in questions if any(wrong in q['correct'] for wrong in ['diktatur', 'zwangsarbeit', 'nazi', 'faschismus'])]) for questions in categories.values())
    print(f"📊 Summary: Found potential issues in {total_issues} questions across all categories")

if __name__ == "__main__":
    comprehensive_check()
