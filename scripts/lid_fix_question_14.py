# -*- coding: utf-8 -*-
import json

# Load questions
with open('public/lid/general.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Find question 14 (G014)
question_14 = None
for q in questions:
    if q['id'] == 'G014':
        question_14 = q
        break

if question_14:
    print(f"Found question: {question_14['id']}")
    print(f"Current text: {question_14['text']}")
    print(f"Current choices: {[c['text'] for c in question_14['choices']]}")
    
    # Fix the choices based on PDF content
    question_14['choices'][0]['text'] = "meine Meinung im Internet äußern kann."
    question_14['choices'][1]['text'] = "Nazi-, Hamas- oder Islamischer Staat-Symbole öffentlich tragen darf."
    question_14['choices'][2]['text'] = "Passanten auf der Straße beschimpfen darf."
    question_14['choices'][3]['text'] = "meine Meinung nur dann äußern darf, solange ich der Regierung nicht widerspreche."
    
    # Clean up the question text (remove the mixed content)
    question_14['text'] = "Meinungsfreiheit in Deutschland heißt, dass ich …"
    
    print(f"Fixed choices: {[c['text'] for c in question_14['choices']]}")
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print("✅ Fixed question 14")
else:
    print("❌ Question 14 not found")
