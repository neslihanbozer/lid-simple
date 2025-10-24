# -*- coding: utf-8 -*-
import os
from PIL import Image, ImageDraw

def preview_crop():
    """Preview crop areas on a snapshot to find correct coordinates"""
    
    # Load BW01 snapshot
    snapshot_path = "public/assets/lid/snapshots/BW01.png"
    if not os.path.exists(snapshot_path):
        print("Snapshot not found")
        return
        
    img = Image.open(snapshot_path)
    width, height = img.size
    print(f"Snapshot size: {width}x{height}")
    
    # Create a copy for drawing
    preview = img.copy()
    draw = ImageDraw.Draw(preview)
    
    # Define potential crop areas (these are estimates)
    crop_areas = {
        'A': (50, 200, 300, 400),      # Left top
        'B': (350, 200, 600, 400),     # Right top  
        'C': (50, 450, 300, 650),      # Left bottom
        'D': (350, 450, 600, 650)      # Right bottom
    }
    
    # Draw rectangles for each crop area
    colors = {'A': 'red', 'B': 'green', 'C': 'blue', 'D': 'yellow'}
    for choice, (x1, y1, x2, y2) in crop_areas.items():
        # Ensure coordinates are within bounds
        x1 = max(0, min(x1, width))
        y1 = max(0, min(y1, height))
        x2 = max(x1, min(x2, width))
        y2 = max(y1, min(y2, height))
        
        if x2 > x1 and y2 > y1:
            # Draw rectangle
            draw.rectangle([x1, y1, x2, y2], outline=colors[choice], width=3)
            # Add label
            draw.text((x1, y1-20), f"{choice}", fill=colors[choice])
    
    # Save preview
    preview_path = "public/assets/lid/crop_preview.png"
    os.makedirs(os.path.dirname(preview_path), exist_ok=True)
    preview.save(preview_path)
    print(f"Preview saved: {preview_path}")
    
    # Also save individual crops for inspection
    for choice, (x1, y1, x2, y2) in crop_areas.items():
        x1 = max(0, min(x1, width))
        y1 = max(0, min(y1, height))
        x2 = max(x1, min(x2, width))
        y2 = max(y1, min(y2, height))
        
        if x2 > x1 and y2 > y1:
            cropped = img.crop((x1, y1, x2, y2))
            crop_path = f"public/assets/lid/crop_{choice}.png"
            cropped.save(crop_path)
            print(f"Crop {choice} saved: {crop_path}")

if __name__ == "__main__":
    preview_crop()
