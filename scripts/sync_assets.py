from pathlib import Path
import shutil
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Acadience App'
PDF_DEST = ROOT / 'public' / 'pdfs'
VIDEO_DEST = ROOT / 'public' / 'videos'
IMAGE_DEST = ROOT / 'public' / 'images'

PDF_DEST.mkdir(parents=True, exist_ok=True)
VIDEO_DEST.mkdir(parents=True, exist_ok=True)
IMAGE_DEST.mkdir(parents=True, exist_ok=True)

def slugify(name: str) -> str:
    name = name.strip().lower()
    name = re.sub(r'\s+', '-', name)
    name = re.sub(r'[^a-z0-9._-]+', '', name)
    return name

manifest = []
for concept_dir in sorted([d for d in SOURCE.iterdir() if d.is_dir()]):
    concept = concept_dir.name
    for file in concept_dir.iterdir():
        if not file.is_file():
            continue
        ext = file.suffix.lower()
        if ext not in {'.pdf', '.mp4', '.png', '.jpg', '.jpeg', '.gif'}:
            continue
        target_name = f"{slugify(concept)}--{slugify(file.name)}"
        if ext == '.pdf':
            dest = PDF_DEST / target_name
        elif ext == '.mp4':
            dest = VIDEO_DEST / target_name
        else:
            dest = IMAGE_DEST / target_name
        shutil.copy2(file, dest)
        manifest.append({
            'concept': concept,
            'source': str(file.relative_to(ROOT)),
            'publicPath': str(dest.relative_to(ROOT / 'public')).replace('\\\\', '/'),
            'filename': file.name,
            'ext': ext,
        })

(ROOT / 'data' / 'generated').mkdir(parents=True, exist_ok=True)
manifest_file = ROOT / 'data' / 'generated' / 'asset-manifest.json'
import json
manifest_file.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(f"Wrote {manifest_file} ({len(manifest)} assets)")
