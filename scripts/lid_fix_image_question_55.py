# -*- coding: utf-8 -*-
import json

def fix_image_question_55():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    # Find G055 - Image question
    for q in questions:
        if q['id'] == 'G055':
            print(f"Fixing G055: {q['text']}")
            print(f"Current kind: {q.get('kind', 'N/A')}")
            print(f"Current choices: {[c['text'] for c in q['choices']]}")
            
            # This is an image question, not text
            q['kind'] = 'single-image'
            
            # The image should be in the snapshots directory
            # Based on the question, this should be a picture of a government building
            # The correct answer should be A (Bundestagssitz) since the credit says "© Deutscher Bundestag"
            q['correctAnswer'] = 0  # A - Bundestagssitz in Berlin
            q['explanation'] = "Das Bild zeigt den Bundestagssitz in Berlin. Der Deutsche Bundestag ist das Parlament der Bundesrepublik Deutschland."
            
            # Add the image asset
            q['asset'] = '/assets/lid/general/G055.png'
            
            print(f"✅ G055: Fixed - now marked as single-image question")
            print(f"Correct answer: A (Bundestagssitz in Berlin)")
            print(f"Asset: {q.get('asset', 'N/A')}")
            break
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_image_question_55()
