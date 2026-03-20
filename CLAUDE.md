# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview built output
npm run lint         # Run ESLint (no auto-fix)
npm run content:check  # Validate JSON structure for posts and cases
npm run check        # Full pre-commit check: content:check + lint + build
```

Run `npm run check` before committing to catch content errors, lint issues, and build failures early.

## Architecture

**Stack:** React 19 + Vite + React Router v7 + Tailwind CSS v4. No SSR — deployed as SPA on Vercel with all routes rewriting to `/index.html`.

**Feature-based structure under `src/`:**
- `app/` — Router setup (`AppRouter.jsx`, `routes.jsx`)
- `features/` — Domain modules: `home/`, `blog/`, `cases/`, `content/`, `not-found/`
- `shared/` — Cross-feature utilities: analytics, components (Reveal, HeroAnimation, LanguageToggle), seo, routing, lib
- `data/` — Source of truth: `posts.json` and `cases.json`
- `translations.js` — All UI strings in EN and ES (flat structure per language)

## Content System

All content lives in `src/data/posts.json` and `src/data/cases.json` as static JSON (no live CMS). Each entry has `en` and `es` keys with translated content.

**Post schema:** `{ slug, date, label, en: { title, excerpt, content: [...blocks] }, es: {...} }`

**Case schema:** keyed by slug, each with `en`/`es` objects containing `label`, `title`, `subtitle`, and typed sections.

**Case registry** (`src/features/cases/data/caseRegistry.js`) stores display metadata (featured flag, order, role, summary) and the `caseOrder` array that controls navigation sequencing. When adding a new case, update this registry.

**Content validation** runs via `scripts/check-content.mjs` and checks for duplicate slugs and missing required fields in both languages.

**Content rendering:** Rich text uses block-based structure `{ type, text, items }`. Types include `intro`, `h2`, `h3`, `list`, `quote`, `code`, etc. Bold syntax: `**text**` becomes `<strong>`.

Content normalization happens in `src/features/content/posts.js` and `src/features/content/cases.js` — these transform raw JSON into objects with computed SEO metadata and section theme info.

## Internationalization

Language state lives in `LanguageProvider` (wraps the app). Consume with `useLanguage()` hook which returns `{ lang, toggleLang }`. All UI strings come from `src/translations.js` — never hardcode user-facing text.

## SEO

Use the `usePageSeo()` hook in page components to set document title, meta description, and OG tags dynamically via `useEffect`.

## Analytics

Vercel Analytics is integrated. Use `trackEvent(name, props)` from `src/shared/analytics/trackEvent.js` for custom events. External links should use `TrackedExternalLink` component to get automatic click tracking.

## Styling

Tailwind CSS v4 with no component library. Pink accent: `pink-500` / `#ec4899`. Glass effects use `backdrop-blur` + semi-transparent backgrounds. The `Reveal` component (`src/shared/components/Reveal.jsx`) wraps content that should fade in on scroll via IntersectionObserver.
