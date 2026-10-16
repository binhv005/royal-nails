import os
import numpy as np
from PIL import Image, ImageFilter

os.makedirs('public/assets/decor', exist_ok=True)

img1_path = r'C:\Users\LENOVO T490S\.gemini\antigravity-ide\brain\866543d9-c706-4717-a63a-77051fa63581\.user_uploaded\media_1791343464001.jpg'
img2_path = r'C:\Users\LENOVO T490S\.gemini\antigravity-ide\brain\866543d9-c706-4717-a63a-77051fa63581\.user_uploaded\media_1791343514214.jpg'

img1 = Image.open(img1_path).convert('RGBA')
img2 = Image.open(img2_path).convert('RGBA')

# Define boxes for elements in img1 (width: 682, height: 1024)
# (left, top, right, bottom)
boxes1 = {
    'decor_scissors_cuticle': (10, 10, 240, 190),
    'decor_nail_lamp_pink': (230, 180, 480, 340),
    'decor_polish_red_drip': (430, 10, 560, 160),
    'decor_nipper_silver': (530, 30, 670, 310),
    'decor_hand_manicure_1': (15, 170, 170, 440),
    'decor_glitter_jar_crystal': (445, 280, 600, 410),
    'decor_nail_polish_softpink': (270, 360, 370, 500),
    'decor_cream_tube_pink': (360, 400, 460, 560),
    'decor_nail_files_duo': (220, 580, 510, 800),
    'decor_hand_holding_bottles': (490, 430, 680, 720),
    'decor_hand_red_nails': (10, 670, 150, 850),
    'decor_red_polish_bottle': (110, 780, 210, 960),
    'decor_hand_holding_file': (250, 780, 460, 1010),
    'decor_cosmetic_bottle_dropper': (560, 820, 675, 980),
    'decor_brush_flower': (465, 700, 580, 825),
}

# Define boxes for elements in img2 (width: 576, height: 1024)
boxes2 = {
    'decor_bow_pink': (140, 15, 250, 105),
    'decor_led_lamp_white': (390, 20, 570, 155),
    'decor_nail_palette_tray': (5, 170, 320, 430),
    'decor_hand_ring_jewelry': (405, 370, 570, 545),
    'decor_nail_drill_pen': (415, 570, 565, 720),
    'decor_nail_scissors_pink': (195, 545, 385, 635),
    'decor_pedicure_bowl': (225, 680, 355, 820),
    'decor_bottles_glitter_duo': (435, 705, 545, 850),
    'decor_spa_towel_kit': (370, 855, 570, 1005),
    'decor_gold_scissors': (225, 825, 365, 965),
    'decor_cherry_polish_floral': (15, 805, 175, 985),
}

def remove_bg_natural(crop_img, bg_type='white'):
    arr = np.array(crop_img, dtype=float)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    
    if bg_type == 'white':
        # Distance to white / off-white background
        # Background has high R, G, B with minimal saturation
        brightness = (r + g + b) / 3.0
        max_c = np.maximum(np.maximum(r, g), b)
        min_c = np.minimum(np.minimum(r, g), b)
        saturation = max_c - min_c
        
        # High brightness and low saturation means background
        bg_score = (brightness / 255.0) * (1.0 - (saturation / 255.0) * 0.7)
        # Smooth alpha mask
        alpha = np.clip((1.0 - bg_score) * 4.5 - 0.3, 0.0, 1.0) * 255.0
        # Protect colored/saturated strokes even if light
        alpha = np.maximum(alpha, np.clip(saturation * 2.5, 0.0, 255.0))
        # Protect dark lines
        alpha = np.maximum(alpha, np.clip((240.0 - brightness) * 3.0, 0.0, 255.0))
    else: # pink gradient bg
        # In img2, background is pink (#F5C4D0 to #FAF0F4)
        # Background has high R, moderate G, moderate B
        # Let's compute distance to pink background color
        # Typical bg: R ~ 245-255, G ~ 205-230, B ~ 215-240
        is_pink_bg = (r > 210) & (g > 180) & (b > 185) & (r >= g) & (abs(g - b) < 35)
        bg_diff = np.sqrt((r - 245)**2 + (g - 215)**2 + (b - 225)**2)
        alpha = np.clip((bg_diff - 25.0) / 45.0, 0.0, 1.0) * 255.0
        
        # Keep crisp outlines and colors
        brightness = (r + g + b) / 3.0
        max_c = np.maximum(np.maximum(r, g), b)
        min_c = np.minimum(np.minimum(r, g), b)
        saturation = max_c - min_c
        alpha = np.maximum(alpha, np.clip((215.0 - brightness) * 3.5, 0.0, 255.0))
        alpha = np.maximum(alpha, np.clip((saturation - 40.0) * 2.5, 0.0, 255.0))

    arr[:, :, 3] = alpha
    result = Image.fromarray(arr.astype(np.uint8), 'RGBA')
    
    # Smooth alpha channel with slight blur for natural cutout
    r_ch, g_ch, b_ch, a_ch = result.split()
    a_ch = a_ch.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    # Crop to non-transparent bounding box with margin
    result = Image.merge('RGBA', (r_ch, g_ch, b_ch, a_ch))
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    return result

print('Processing Image 1 elements...')
for name, box in boxes1.items():
    cropped = img1.crop(box)
    cleaned = remove_bg_natural(cropped, bg_type='white')
    out_path = f'public/assets/decor/{name}.png'
    cleaned.save(out_path, 'PNG')
    print(f'Saved {out_path} ({cleaned.size})')

print('\nProcessing Image 2 elements...')
for name, box in boxes2.items():
    cropped = img2.crop(box)
    cleaned = remove_bg_natural(cropped, bg_type='pink')
    out_path = f'public/assets/decor/{name}.png'
    cleaned.save(out_path, 'PNG')
    print(f'Saved {out_path} ({cleaned.size})')

print('\nAll decorative elements extracted successfully!')
