# Calendly Integration Setup

## Quick Start

The Calendly embed is now integrated with lazy loading and a configurable URL.

## Setting Your Calendly URL

### Option 1: Environment Variable (Recommended for Production)

1. **In Vercel:**
   - Go to your project settings → Environment Variables
   - Add: `VITE_CALENDLY_URL`
   - Value: Your Calendly URL (e.g., `https://calendly.com/rymdix/30min`)
   - Apply to: Production, Preview, Development
   - Redeploy

2. **Local Development (.env file):**
   - Create `.env` in project root (if not exists)
   - Add: `VITE_CALENDLY_URL=https://calendly.com/your-username/event-name`
   - Restart dev server: `npm run dev`

### Option 2: Direct Code Edit (Not Recommended)

Edit `src/config/constants.ts`:
```typescript
export const CALENDLY_URL = "https://calendly.com/your-username/event-name";
```

## Calendly URL Format

Your Calendly URL should be in this format:
```
https://calendly.com/[your-username]/[event-name]
```

Examples:
- `https://calendly.com/rymdix/30min`
- `https://calendly.com/rymdix/discovery-call`
- `https://calendly.com/yourname/consultation`

## Features

✅ **Lazy Loading**: Widget only loads when user scrolls near the "Book a Call" section
✅ **Loading Skeleton**: Clean loading state (no placeholder text)
✅ **Responsive**: Full width on mobile, proper height (650px+ desktop, 700-800px mobile)
✅ **Fallback**: If `CALENDLY_URL` is missing, shows email button with prefilled subject
✅ **Error Handling**: If widget fails to load, shows email fallback

## How It Works

1. **IntersectionObserver**: Detects when "Book a Call" section is 200px from viewport
2. **Dynamic Script Loading**: Loads Calendly script only when needed
3. **Inline Widget**: Uses Calendly's inline widget (not popup) for better UX
4. **Performance**: Doesn't block initial page load or hurt Lighthouse scores

## Testing

1. **With URL set:**
   - Scroll to "Book a Call" section
   - Should see loading spinner, then Calendly widget appears
   - Widget should be fully functional

2. **Without URL (fallback):**
   - Remove `VITE_CALENDLY_URL` from env
   - Should see "Book via Email" button
   - Clicking opens email client with prefilled subject

## Troubleshooting

**Widget not loading?**
- Check browser console for errors
- Verify Calendly URL is correct format
- Ensure Calendly event is published (not draft)
- Check network tab for script loading

**Still showing email fallback?**
- Verify `VITE_CALENDLY_URL` is set correctly
- Restart dev server after adding env var
- Check that URL doesn't have trailing slash

## Current Status

✅ Calendly component created (`src/components/CalendlyEmbed.tsx`)
✅ Config constant created (`src/config/constants.ts`)
✅ Lazy loading implemented
✅ Loading skeleton added
✅ Email fallback implemented
✅ Contact page updated

**Next Step:** Set `VITE_CALENDLY_URL` environment variable with your Calendly URL.


