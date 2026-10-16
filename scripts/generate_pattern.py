import os
import random
from PIL import Image

# Create a much sparser, more spacious seamless wallpaper pattern (1400x1400)
w, h = 1400, 1400
pattern = Image.new('RGBA', (w, h), (0, 0, 0, 0))

decor_dir = 'public/assets/decor'
# Pick only 9-10 best aesthetic elements
files = [
    'decor_nail_lamp_pink.png',
    'decor_cherry_polish_floral.png',
    'decor_hand_manicure_1.png',
    'decor_glitter_jar_crystal.png',
    'decor_nail_polish_softpink.png',
    'decor_nail_files_duo.png',
    'decor_bow_pink.png',
    'decor_gold_scissors.png',
    'decor_bottles_glitter_duo.png',
]

# 3x3 grid for sparse, breathable distribution
cols, rows = 3, 3
cell_w = w / cols
cell_h = h / rows

random.seed(123)
selected_files = files.copy()
random.shuffle(selected_files)

idx = 0
for r in range(rows):
    for c in range(cols):
        fname = selected_files[idx % len(selected_files)]
        idx += 1
        img_p = os.path.join(decor_dir, fname)
        if not os.path.exists(img_p):
            continue
        elem = Image.open(img_p).convert('RGBA')
        
        # Max dimension ~ 110-135px
        max_dim = random.randint(110, 135)
        elem.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        
        # Subtle rotation
        rot_angle = random.randint(-18, 18)
        elem = elem.rotate(rot_angle, expand=True, resample=Image.Resampling.BICUBIC)
        
        # Center with slight natural jitter
        cx = int(c * cell_w + cell_w / 2 + random.randint(-20, 20))
        cy = int(r * cell_h + cell_h / 2 + random.randint(-20, 20))
        
        px = cx - elem.width // 2
        py = cy - elem.height // 2
        
        # Paste with seamless wrap
        for offset_x in [0, -w, w]:
            for offset_y in [0, -h, h]:
                pattern.paste(elem, (px + offset_x, py + offset_y), elem)

out_pattern = 'public/assets/decor/nail_wallpaper_seamless.png'
pattern.save(out_pattern, 'PNG')
print(f'Generated sparse pattern at {out_pattern}!')
