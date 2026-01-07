# Blog Posts Seed Data - Setup Instructions

## Overview

This seed file contains 4 professional, SEO-focused blog posts for rymdix.com. All posts are stored in Supabase and fully editable via the admin dashboard at `/admin/posts`.

## How to Insert the Posts

### Option 1: Supabase SQL Editor (Recommended)

1. Log into your Supabase dashboard
2. Go to SQL Editor
3. Open the file `supabase-blog-seed.sql`
4. Copy the entire contents
5. Paste into SQL Editor
6. Click "Run" or press Ctrl+Enter
7. Verify: Check that 4 rows were inserted

### Option 2: Admin Dashboard (Manual)

1. Log into admin dashboard at `/admin/login`
2. Go to Posts → New Post
3. Create each post manually using the form
4. Copy content from the seed file

## Blog Posts Included

1. **Why Most Business Software Fails After 6 Months**
   - Slug: `why-most-business-software-fails`
   - Focus: Why tools fail, when to rebuild vs patch

2. **Automation Isn't About AI — It's About Removing Friction**
   - Slug: `automation-is-about-removing-friction`
   - Focus: Real automation vs AI hype, practical examples

3. **Custom Software vs SaaS: How to Decide What Your Business Actually Needs**
   - Slug: `custom-software-vs-saas`
   - Focus: Decision framework for founders

4. **Building Internal Tools That Teams Actually Use**
   - Slug: `building-internal-tools-teams-use`
   - Focus: UX for internal tools, adoption strategies

## Content Format

- Content is stored as plain text (not markdown)
- Line breaks are preserved with `whitespace-pre-wrap`
- Headings use `##` format (will display as plain text but clearly structured)
- All posts are set to `published: true`
- Cover images are `NULL` (will use default fallback image)

## Verification

After inserting:

1. **Public Blog**: Visit `/blog` - should show all 4 posts
2. **Individual Posts**: Click each post - should load correctly
3. **Admin Dashboard**: Go to `/admin/posts` - should see all 4 posts
4. **Edit Test**: Edit a post title/content - should save correctly
5. **Publish/Unpublish**: Toggle published status - should update

## Notes

- All posts use current timestamp for `created_at` and `updated_at`
- Slugs are unique and SEO-friendly
- Content is written for founders/business owners (no buzzwords)
- All posts are immediately published and visible

## Default Cover Images

If `cover_image_url` is NULL, the blog pages will use the default cover image from `@/assets/blog-cover-default.jpg`.

To add cover images later:
1. Upload images to Supabase Storage or external CDN
2. Edit posts in admin dashboard
3. Add image URL to `cover_image_url` field


