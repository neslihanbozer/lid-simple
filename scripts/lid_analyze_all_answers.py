# -*- coding: utf-8 -*-
import json
import re

def analyze_question_answers():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"Analyzing {len(questions)} questions...")
    
    # Common patterns that might indicate wrong answers
    suspicious_patterns = []
    
    for i, q in enumerate(questions):
        qid = q['id']
        text = q['text'].lower()
        choices = [c['text'].lower() for c in q['choices']]
        correct_idx = q.get('correctAnswer', -1)
        
        # Check for obviously wrong patterns
        issues = []
        
        # Pattern 1: "Deutschland ist" questions
        if "deutschland ist" in text:
            if correct_idx == 2 and "diktatur" in choices[2]:  # C is Diktatur
                issues.append("❌ Diktatur marked as correct for 'Deutschland ist'")
            if correct_idx != 1 and "bundesstaat" in choices[1]:  # B is Bundesstaat but not correct
                issues.append("❌ Bundesstaat not marked as correct for 'Deutschland ist'")
        
        # Pattern 2: Meinungsfreiheit questions
        if "meinungsfreiheit" in text:
            if correct_idx == 2 and "nazi" in choices[2]:  # C mentions Nazi symbols
                issues.append("❌ Nazi symbols marked as correct for Meinungsfreiheit")
            if correct_idx != 0 and "internet" in choices[0]:  # A mentions Internet
                issues.append("❌ Internet expression not marked as correct for Meinungsfreiheit")
        
        # Pattern 3: Grundgesetz questions
        if "grundgesetz" in text:
            if correct_idx == 2 and "zwangsarbeit" in choices[2]:  # C is Zwangsarbeit
                issues.append("❌ Zwangsarbeit marked as correct for Grundgesetz")
        
        # Pattern 4: Demokratie questions
        if "demokratie" in text or "demokratisch" in text:
            if correct_idx == 2 and "diktatur" in choices[2]:  # C is Diktatur
                issues.append("❌ Diktatur marked as correct for Demokratie")
        
        # Pattern 5: Wahlen questions
        if "wahlen" in text or "wählen" in text:
            if correct_idx == 2 and "zwang" in choices[2]:  # C mentions Zwang
                issues.append("❌ Zwang marked as correct for Wahlen")
        
        # Pattern 6: Check for obviously wrong answers
        if correct_idx >= 0 and correct_idx < len(choices):
            correct_choice = choices[correct_idx]
            
            # Obviously wrong answers
            wrong_answers = [
                "diktatur", "zwangsarbeit", "nazi", "faschismus", 
                "totalitär", "autoritär", "unterdrückung", "zensur"
            ]
            
            for wrong in wrong_answers:
                if wrong in correct_choice:
                    issues.append(f"❌ Obviously wrong answer marked as correct: '{correct_choice}'")
        
        # Pattern 7: Check explanation relevance
        explanation = q.get('explanation', '')
        if explanation:
            # Check if explanation is generic EU text for non-EU questions
            if "europäischen union" in explanation.lower() and "eu" not in text and "europa" not in text:
                issues.append("❌ EU explanation for non-EU question")
        
        if issues:
            suspicious_patterns.append({
                'id': qid,
                'number': q.get('numberInCatalog', '?'),
                'text': q['text'][:100] + "...",
                'correctAnswer': correct_idx,
                'correctChoice': choices[correct_idx] if correct_idx >= 0 else "N/A",
                'issues': issues
            })
    
    # Print results
    print(f"\n🔍 Found {len(suspicious_patterns)} potentially problematic questions:\n")
    
    for item in suspicious_patterns[:20]:  # Show first 20
        print(f"Question {item['number']} ({item['id']}):")
        print(f"  Text: {item['text']}")
        print(f"  Correct Answer: {item['correctAnswer']} - '{item['correctChoice']}'")
        for issue in item['issues']:
            print(f"  {issue}")
        print()
    
    if len(suspicious_patterns) > 20:
        print(f"... and {len(suspicious_patterns) - 20} more questions with issues")
    
    return suspicious_patterns

if __name__ == "__main__":
    analyze_question_answers()
