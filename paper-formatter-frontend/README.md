# paper-formatter-frontend

React frontend for **ai-paper-formatter** — formats research papers (PDF/DOCX)
into IEEE, ACM, Springer, Elsevier, APA, or arXiv LaTeX PDFs.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Plain CSS Modules (no Tailwind, no CSS-in-JS) |
| Fonts | Playfair Display · Outfit · JetBrains Mono |
| 3D (future) | anime.js — hooks already in place |

---

## Project structure

```
src/
  App.jsx                         ← root, imports styles barrel
  main.jsx                        ← ReactDOM entry
  styles/
    index.css                     ← barrel: imports all CSS files in order
    globals.css                   ← design tokens (CSS variables), reset
    Navbar.css
    Hero.css
    Button.css
    PipelineStrip.css
    FormatterPanel.css            ← panels, dropzone, textarea, result
    LogConsole.css
    Features.css
    Footer.css
  components/
    Button/
      Button.jsx
    Navbar/
      Navbar.jsx
    Hero/
      Hero.jsx
    PipelineStrip/
      PipelineStrip.jsx           ← 6-stage live progress bar
    FormatterPanel/
      FormatterSection.jsx        ← state owner: orchestrates input+output+log
      InputPanel.jsx              ← file drop, template chips, textarea, CTA
      OutputPanel.jsx             ← idle / progress / result states
    LogConsole/
      LogConsole.jsx              ← terminal-style live log
    Features/
      Features.jsx                ← feature cards + how-it-works steps
    Footer/
      Footer.jsx
  pages/
    HomePage.jsx                  ← composes all sections
  utils/
    constants.js                  ← TEMPLATES, PIPELINE_STAGES, simulatePipeline()
```

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
```

---

## Backend API contract

When wiring to the real Python pipeline (`http://localhost:8000`):

```js
// Format a paper
POST /format
Content-Type: multipart/form-data
Body: { file: <binary>, template: 'ieee' }
      OR { text: 'raw paper content', template: 'ieee' }

Response: {
  pdf_url:    '/output/paper_ieee.pdf',
  tex_url:    '/output/paper_ieee.tex',
  log:        '...pipeline_latest.log contents...',
  sections:   8,
  refs:       42,
  tables:     3,
  confidence: 87,
  elapsed:    '4.7s'
}

GET /templates   → { templates: ['ieee','acm','springer','elsevier','apa','arxiv'] }
GET /health      → { status: 'ok' }
```

Replace `simulatePipeline()` in `src/utils/constants.js` with real `fetch` calls.

---

## anime.js 3D prep

The following IDs and CSS properties are ready for anime.js targeting:

```js
// Panel flip on format start
anime({
  targets: '#pf-input-panel',
  rotateY: [0, 5],
  duration: 600,
  easing: 'easeOutElastic(1, 0.8)'
})

// Log console slide in
anime({
  targets: '#pf-log-console',
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 400,
  easing: 'easeOutQuart'
})
```

All panels have `transform-style: preserve-3d` set in CSS already.

---

## Git workflow

```bash
git add -A
git commit -m "feat: add React frontend with proper component structure"
git push origin main
```
