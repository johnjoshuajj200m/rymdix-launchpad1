# Rymdix Technologies

Official website and admin dashboard for Rymdix Technologies - a custom software development company specializing in web applications, workflow automation, and AI-powered business systems.

## Overview

This is the production website for Rymdix Technologies, featuring:

- **Public Website**: Marketing site with services, case studies, blog, and contact forms
- **Admin Dashboard**: Content management system for blog posts, services, leads, and analytics
- **Blog System**: SEO-optimized blog with Supabase backend
- **Analytics Integration**: Google Analytics tracking and admin analytics dashboard

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rymdix-launchpad-1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
VITE_CALENDLY_URL=your_calendly_url
```

4. Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/       # Reusable React components
│   ├── admin/       # Admin dashboard components
│   ├── layout/      # Layout components (Navbar, Footer)
│   ├── sections/    # Homepage sections
│   └── ui/          # shadcn/ui components
├── pages/           # Page components
│   ├── admin/       # Admin dashboard pages
│   └── services/    # Service detail pages
├── lib/             # Utilities and Supabase client
├── config/          # Configuration constants
└── contexts/        # React contexts (Auth, etc.)
```

## Database Setup

The application uses Supabase for data storage. Run the following SQL files in your Supabase SQL Editor:

1. `supabase-schema.sql` - Creates blog_posts and leads tables
2. `supabase-services-schema.sql` - Creates services table
3. `supabase-blog-seed.sql` - Optional: Seed 4 initial blog posts

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The `vercel.json` file configures:
- SPA routing (all routes → `/index.html`)
- Filesystem-first routing for static assets

### Environment Variables (Vercel)

Set these in Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GA_MEASUREMENT_ID`
- `VITE_CALENDLY_URL`

## Features

### Public Website
- Responsive homepage with services, case studies, and blog preview
- Service detail pages
- Blog with SEO optimization
- Contact form with Calendly integration
- Google Analytics tracking

### Admin Dashboard
- Authentication via Supabase
- Blog post management (CRUD)
- Services management (CRUD)
- Leads management
- Analytics dashboard (Google Analytics integration)
- Settings page

## License

Proprietary - © Rymdix Technologies
