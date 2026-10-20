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
