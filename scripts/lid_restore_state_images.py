# -*- coding: utf-8 -*-
import os
import json
from PIL import Image

def restore_state_images():
    """Restore state images with better coordinates"""
    
    # More conservative crop coordinates to avoid cutting off important parts
    crop_areas = {
        'A': (80, 250, 350, 450),      # Left top - more conservative
        'B': (400, 250, 670, 450),     # Right top - more conservative
        'C': (80, 500, 350, 700),      # Left bottom - more conservative
        'D': (400, 500, 670, 700)      # Right bottom - more conservative
    }
    
    for state_code in ["BW", "BE", "BY", "BB", "HB", "HH", "HE", "MV", "NI", "NW", "RP", "SL", "SN", "ST", "SH", "TH"]:
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
                print(f"    Snapshot size: {width}x{height}")
                
                # Create states directory
                state_dir = f"public/assets/lid/states/{state_code}"
                os.makedirs(state_dir, exist_ok=True)
                
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
                        output_path = f"{state_dir}/{question_id}_{choice_id}.png"
                        cropped.save(output_path, "PNG", optimize=True)
                        print(f"    Saved {choice_id}: {output_path}")
        
        print(f"  Completed {state_code}")

if __name__ == "__main__":
    restore_state_images()
    print("✅ State images restored!")
