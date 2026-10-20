# Shanjai Senthil — Portfolio

A responsive, recruiter-focused portfolio built with React, TypeScript, Vite, Tailwind CSS, Motion, and Lucide icons.

## Architecture

- `src/components/layout/` composes the navbar, footer, and application layout.
- `src/components/sections/` contains page sections and their case-study/contact UI.
- `src/components/ui/` contains shared headings, cards, theme, progress, and resume controls.
- `src/components/interactive/` contains the command palette, terminal, recruiter toggle, and project filter.
- `src/data/` contains typed candidate, work, project, education, achievement, navigation, and skill data.
- `src/hooks/` contains theme persistence and scroll/active-section tracking.
- `src/App.tsx` delegates to the main layout.

## Run locally

```sh
npm install
npm run dev
```

## Analytics and privacy consent

- Copy `.env.example` to `.env.local` for local development. These public project/measurement IDs are configured with `VITE_CLARITY_PROJECT_ID` and `VITE_GA_MEASUREMENT_ID`.
- Set both variables in the hosting provider's build environment before building for production; Vite embeds them into the client bundle.
- Google Analytics 4 and Microsoft Clarity are initialized only after a visitor allows optional analytics. Their scripts are not loaded before consent. Visitors can reject or withdraw consent with **Privacy choices** in the footer.
- Contact-form fields, the command palette, and the interactive terminal are masked in Clarity recordings. Analytics events contain only fixed action labels and non-personal placement/project/section values; contact-form contents are never sent.
- GA4 page views are sent once per document after consent, with automatic page views disabled to avoid duplicates. Source attribution uses sanitized referrer origins and allowlisted UTM source, medium, and campaign parameters.
- For local-only analytics diagnostics, run the dev server and open the site with `?analytics_debug=1`. The console reports provider initialization, sanitized request endpoints/statuses when the browser exposes them, and event names without visitor data. Diagnostics are disabled in production builds and do not bypass consent.

## Quality checks

```sh
npm run lint
npm run format:check
npm run build
```

## Personalize

- Update the typed profile and work history in `src/data/`.
- The provided resume PDF is available at `public/resume.pdf`; its download link is configured in `src/data/profile.ts`.
- Configure real social profile URLs in `src/data/profile.ts` before adding public social links.
- The canonical URL and sitemap use the current public URL in `index.html`, `public/robots.txt`, and `public/sitemap.xml`; update them if the site moves to a custom domain.
- The 1200×630 LinkedIn/Open Graph preview image is `public/social-preview.jpg`.
- The contact form validates locally and opens a prefilled email draft; it does not claim to send messages.

Project cards describe professional contributions and use custom conceptual visuals, not employer screenshots.
