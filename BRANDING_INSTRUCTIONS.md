# Rymdix Branding Assets - Setup Instructions

## Favicon Files Required

The following favicon files need to be created from the SVG favicon (`public/favicon.svg`):

1. **favicon.ico** - 32x32 (already created as SVG data URI, but should be converted to proper ICO)
2. **favicon-16x16.png** - 16x16 PNG
3. **favicon-32x32.png** - 32x32 PNG  
4. **apple-touch-icon.png** - 180x180 PNG

## How to Generate Favicons

### Option 1: Online Tool
1. Go to https://realfavicongenerator.net/
2. Upload `public/favicon.svg`
3. Configure settings:
   - iOS: 180x180
   - Android: 192x192, 512x512
   - Windows: 270x270
4. Download and place files in `public/` directory

### Option 2: ImageMagick (Command Line)
```bash
# Convert SVG to PNG sizes
convert public/favicon.svg -resize 16x16 public/favicon-16x16.png
convert public/favicon.svg -resize 32x32 public/favicon-32x32.png
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
```

## OG Image

Create `public/og-image.png` (1200x630px) with:
- Dark background (#0f1419)
- "Rymdix" wordmark (white, large, centered)
- Rocket icon (blue gradient)
- Minimal, premium design

Or use the SVG template in `public/og-image.svg` and convert to PNG.

## Current Status

✅ Logo component created (`src/components/brand/Logo.tsx`)
✅ Navbar updated with Logo
✅ Admin sidebar updated with Logo
✅ Favicon SVG created
✅ Calendly integration added
✅ Trust signals added
✅ Typography improvements
⏳ PNG favicon files need to be generated (see instructions above)
⏳ OG image needs to be created (see instructions above)

