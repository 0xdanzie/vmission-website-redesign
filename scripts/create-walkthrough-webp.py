import os
from PIL import Image

qa_dir = os.path.join(os.path.dirname(__file__), '..', 'docs', 'qa', 'phase-3e1')

ordered_routes = [
    'home-desktop.png',
    'about-desktop.png',
    'acharyas-desktop.png',
    'acharya-swami-atmananda-desktop.png',
    'ashram-desktop.png',
    'teachings-desktop.png',
    'teaching-drig-drushya-01-desktop.png',
    'publications-desktop.png'
]

images = []
for filename in ordered_routes:
    file_path = os.path.join(qa_dir, filename)
    if os.path.exists(file_path):
        img = Image.open(file_path).convert('RGB')
        # Resize slightly to 1200x750 to optimize webp size and fluidity
        img = img.resize((1200, 750), Image.Resampling.LANCZOS)
        images.append(img)
        print(f"Loaded frame: {filename}")
    else:
        print(f"Missing frame: {filename}")

if images:
    out_path = os.path.join(qa_dir, 'PHASE-3E1-VISUAL-REVIEW-RECORDING.webp')
    # 2200ms per frame to allow leisurely visual inspection of each Ashram room
    images[0].save(
        out_path,
        save_all=True,
        append_images=images[1:],
        duration=2200,
        loop=0,
        quality=85,
        method=4
    )
    print(f"\n[CREATED WALKTHROUGH RECORDING] {out_path} ({os.path.getsize(out_path)} bytes)")
else:
    print("No images found.")
