# SP3 Digital — Website v1

A production-ready marketing site for SP3 Digital, an enterprise technology
consultancy. Static HTML/CSS/JS — no build step, no framework, no dependencies.

## Structure

```
SP3-Digital-v1/
├── index.html
├── css/
│   ├── styles.css        Design tokens, reset, base type, layout utilities, hero layout
│   ├── components.css    Nav, buttons, cards, badges, forms, footer
│   ├── animations.css    Keyframes, scroll-reveal, hero network, marquee
│   └── responsive.css    Tablet (≤1024px) and mobile (≤680px) breakpoints
├── js/
│   ├── navigation.js     Sticky header, mobile menu, active-section highlighting
│   ├── animations.js     Scroll-reveal engine, scroll progress bar, hero parallax
│   ├── counter.js        Animated stat counters (IntersectionObserver-driven)
│   └── app.js            Contact form handling, newsletter form, anchor scrolling
└── assets/                (placeholder — all current graphics are inline SVG)
```

## Sections included

Sticky/transparent nav with animated hamburger · Hero with custom SVG node
illustration, stats, and trust strip · Capabilities (6 services) · "Why SP3"
three-pillar methodology (Strategy / Platform / Performance) · Industries ·
Technology marquee · Case studies with metrics · Leadership · Contact form ·
Footer with newsletter signup.

## Running it locally

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Serve it locally for the best experience with relative paths:
  ```bash
  npx serve .
  # or
  python3 -m http.server 8080
  ```

## Content to swap before launch

- All copy (stats, case study figures, leadership names/bios) is placeholder —
  written to be plausible and on-brand, not factual claims. Replace before publishing.
- Contact form (`#contact-form` in `index.html`, handled in `js/app.js`) currently
  simulates a submission client-side. Point it at a real endpoint (Formspree,
  a serverless function, your CRM's API, etc.) before going live.
- Social links in the footer are placeholders (`href="#"`).
- Replace the favicon/brand mark SVGs in `index.html` with a real logo if you
  have one — the current mark is a simple three-node motif standing in for "SP3."

## Design notes

- Palette: primary `#2563EB`, secondary/ink `#0F172A`, accent `#14B8A6`,
  surface `#F8FAFC`, body text `#334155`. Full token list in `css/styles.css`.
- Type: Poppins (display/headings), Inter (body/UI), JetBrains Mono (stats,
  eyebrows, labels — gives the data-heavy sections a technical feel).
- Motion respects `prefers-reduced-motion` throughout.
- Built mobile-first-adjacent: tested at 390px, 820px, and 1440px widths.

## Path to a CMS / React migration

Content is grouped by section with consistent `id`s (`#capabilities`,
`#industries`, etc.) so each block can be lifted into a CMS entry or a
React/Next.js component with minimal restructuring later.
