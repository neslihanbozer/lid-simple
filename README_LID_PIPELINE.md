# LiD clean pipeline

## Setup

1) Put PDF: `public/data/gesamtfragenkatalog-lebenindeutschland.pdf`
2) (Optional) Provide `content/answers.json` or `content/answers.csv`

## Usage

```bash
npm run lid:setup
npm run lid:all
npm run dev
# sanity check
npm run lid:sanity
```

## Pipeline Steps

1. **lid:clean** - Removes derived files and resets directories
2. **lid:pdf:extract** - Extracts questions and images using PyMuPDF xref + get_image_rects()
3. **lid:build** - Joins data, normalizes text, validates files
4. **lid:sanity** - Audits dataset for common issues

## Output

- `public/data/questions_full.json` - Complete dataset with normalized text
- `public/assets/lid/export/` - Cropped images named as `{kategori}_{soruNo}_{sorukismi|xxx}_{siklar|xxxx}_{slot}.png`

## Test Pages

- `/quiz` - Clean quiz renderer
- `/dev/lid-review` - Data review interface

## Features

- ✅ PyMuPDF xref + get_image_rects() for positioned image extraction
- ✅ Strong text normalization (removes "Bild 1..4" trains, stray bullets/boxes)
- ✅ Separate STEM vs Choice images
- ✅ Zod validation + file-existence check (fails on error)
- ✅ Clean Quiz renderer (no chips, no duplicated "Bild" text)
- ✅ Sanity script to audit dataset
