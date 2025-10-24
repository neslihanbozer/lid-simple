# -*- coding: utf-8 -*-
import os
import json
import fitz  # PyMuPDF
from PIL import Image
import io

# State codes
STATE_CODES = ["BW", "BY", "BE", "BB", "HB", "HH", "HE", "MV", "NI", "NW", "RP", "SL", "SN", "ST", "SH", "TH"]

def clean_state_images():
    """Clean state images by cropping out text and keeping only the image parts"""
    
    for state_code in STATE_CODES:
        print(f"Processing {state_code}...")
        
        # Load state JSON
        json_path = f"public/lid/{state_code.lower()}.json"
        if not os.path.exists(json_path):
            print(f"  Skipping {state_code} - JSON not found")
            continue
            
        with open(json_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        # Process each question
        for question in questions:
            if question.get('kind') == 'image-choice':
                question_id = question['id']
                print(f"  Processing {question_id}...")
                
                # Get snapshot path
                snapshot_path = f"public/assets/lid/snapshots/{question_id}.png"
                if not os.path.exists(snapshot_path):
                    print(f"    Snapshot not found: {snapshot_path}")
                    continue
                
                # Load snapshot
                snapshot_img = Image.open(snapshot_path)
                width, height = snapshot_img.size
                
                # Define crop areas for A, B, C, D (these are rough estimates)
                # You may need to adjust these coordinates based on the actual layout
                crop_areas = {
                    'A': (50, 200, 300, 400),      # Left top
                    'B': (350, 200, 600, 400),     # Right top  
                    'C': (50, 450, 300, 650),      # Left bottom
                    'D': (350, 450, 600, 650)      # Right bottom
                }
                
                # Crop and save each choice image
                for choice_id, (x1, y1, x2, y2) in crop_areas.items():
                    # Ensure coordinates are within image bounds
                    x1 = max(0, min(x1, width))
                    y1 = max(0, min(y1, height))
                    x2 = max(x1, min(x2, width))
                    y2 = max(y1, min(y2, height))
                    
                    if x2 > x1 and y2 > y1:
                        cropped = snapshot_img.crop((x1, y1, x2, y2))
                        
                        # Save cropped image
                        output_path = f"public/assets/lid/states/{state_code}/{question_id}_{choice_id}.png"
                        os.makedirs(os.path.dirname(output_path), exist_ok=True)
                        cropped.save(output_path, "PNG", optimize=True)
                        print(f"    Saved {choice_id}: {output_path}")
        
        print(f"  Completed {state_code}")

if __name__ == "__main__":
    clean_state_images()
    print("✅ State images cleaned!")
