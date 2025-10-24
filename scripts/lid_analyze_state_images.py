# -*- coding: utf-8 -*-
import os
from PIL import Image

def analyze_state_images():
    """Analyze state images to find the correct crop coordinates"""
    
    # Check a few state images
    test_cases = [
        ("BW", "BW01"),
        ("BE", "BE01"), 
        ("BY", "BY01")
    ]
    
    for state_code, question_id in test_cases:
        print(f"\nAnalyzing {state_code} - {question_id}")
        
        # Check if snapshot exists
        snapshot_path = f"public/assets/lid/snapshots/{question_id}.png"
        if not os.path.exists(snapshot_path):
            print(f"  Snapshot not found: {snapshot_path}")
            continue
            
        # Load and analyze snapshot
        img = Image.open(snapshot_path)
        width, height = img.size
        print(f"  Snapshot size: {width}x{height}")
        
        # Check if choice images exist
        for choice in ['A', 'B', 'C', 'D']:
            choice_path = f"public/assets/lid/states/{state_code}/{question_id}_{choice}.png"
            if os.path.exists(choice_path):
                choice_img = Image.open(choice_path)
                choice_width, choice_height = choice_img.size
                print(f"  {choice}: {choice_width}x{choice_height}")
            else:
                print(f"  {choice}: Not found")

if __name__ == "__main__":
    analyze_state_images()
