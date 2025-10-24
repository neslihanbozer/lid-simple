#!/usr/bin/env python3
"""
Normalize all question JSON files to the new schema
"""

import json
import os
import glob

def normalize_question(question, is_state=False, state_code=None):
    """Normalize a single question object"""
    
    # Add category
    question['category'] = 'state' if is_state else 'general'
    
    # Add stateCode for state questions
    if is_state and state_code:
        question['stateCode'] = state_code
    
    # Normalize choices
    if 'choices' in question:
        normalized_choices = []
        for choice in question['choices']:
            normalized_choice = {
                'key': choice.get('id', 'A'),
                'text': choice.get('text', ''),
                'imageUrls': []
            }
            
            # Migrate single imageUrl to imageUrls array
            if 'imageSrc' in choice and choice['imageSrc']:
                image_url = choice['imageSrc']
                # Ensure leading slash
                if not image_url.startswith('/'):
                    image_url = '/' + image_url
                normalized_choice['imageUrls'] = [image_url]
            
            # Remove old fields
            if 'id' in choice:
                del choice['id']
            if 'imageSrc' in choice:
                del choice['imageSrc']
            
            # Merge normalized choice with existing choice
            choice.update(normalized_choice)
            normalized_choices.append(choice)
        
        question['choices'] = normalized_choices
    
    return question

def main():
    print("Normalizing all question JSON files...")
    
    # Process general questions
    print("\n=== Processing General Questions ===")
    try:
        with open('public/lid/general.json', 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        normalized_questions = []
        for question in questions:
            normalized = normalize_question(question, is_state=False)
            normalized_questions.append(normalized)
        
        with open('public/lid/general.json', 'w', encoding='utf-8') as f:
            json.dump(normalized_questions, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Normalized {len(normalized_questions)} general questions")
        
    except Exception as e:
        print(f"❌ Error processing general.json: {e}")
    
    # Process state questions
    print("\n=== Processing State Questions ===")
    state_files = glob.glob('public/lid/*.json')
    state_files = [f for f in state_files if not f.endswith('general.json')]
    
    for file_path in state_files:
        state_code = os.path.basename(file_path).replace('.json', '').upper()
        print(f"Processing {state_code}...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                questions = json.load(f)
            
            normalized_questions = []
            for question in questions:
                normalized = normalize_question(question, is_state=True, state_code=state_code)
                normalized_questions.append(normalized)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(normalized_questions, f, ensure_ascii=False, indent=2)
            
            print(f"  ✅ Normalized {len(normalized_questions)} questions in {state_code}")
            
        except Exception as e:
            print(f"  ❌ Error processing {file_path}: {e}")
    
    print("\n=== Normalization Complete ===")
    print("All question files have been normalized to the new schema!")

if __name__ == "__main__":
    main()
