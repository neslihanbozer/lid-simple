# -*- coding: utf-8 -*-
import json
import os

# Load existing questions
with open('public/lid/general.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Check which questions have images
image_questions = []
for question in questions:
    if question.get('kind') == 'image-choice':
        image_questions.append(question)

print(f"Found {len(image_questions)} image-choice questions")

# Add imageSrc to choices for image-choice questions
for question in image_questions:
    qid = question['id']
    # Convert G021 to GEN021 format
    gen_id = qid.replace('G', 'GEN')
    
    for i, choice in enumerate(question['choices']):
        choice_letter = ['A', 'B', 'C', 'D'][i]
        image_path = f"/assets/lid/general/{gen_id}_{choice_letter}.png"
        
        # Check if file exists
        file_path = f"public/assets/lid/general/{gen_id}_{choice_letter}.png"
        if os.path.exists(file_path):
            choice['imageSrc'] = image_path
            print(f"✅ Added image for {qid} choice {choice_letter}")
        else:
            print(f"❌ Missing image for {qid} choice {choice_letter}: {file_path}")

# Save updated questions
with open('public/lid/general.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("✅ Updated general.json with image sources")
