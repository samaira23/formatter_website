// src/components/Features/Features.jsx
import { useEffect } from "react";
import *as anime from "animejs";

const FEATURE_CARDS = [
  {
    num: '01',
    icon: '⬡',
    title: 'Six-Stage Pipeline',
    body: (
      <>
        Extract → Parse → Validate → Normalize → Render → Compile
Every stage is logged, so you can trace exactly how your paper was transformed.
      </>
    ),
  },
  {
    num: '02',
    icon: '◎',
    title: 'Validation Engine',
    body: (
      <>
       Each document is scored before rendering.
Low-confidence parses are flagged or corrected to prevent broken output.
      </>
    ),
  },
  {
    num: '03',
    icon: '◈',
    title: 'Equation Recovery',
    body: (
      <>
       Recovers mathematical expressions using OCR pipelines.
Converts them into valid LaTeX without breaking the document.
      </>
    ),
  },
  {
    num: '04',
    icon: '◇',
    title: 'Structure Detection',
    body: (
      <>
       Detects headings, sections, and hierarchy using font and pattern analysis — not just plain text.
      </>
    ),
  },
  {
    num: '05',
    icon: '◉',
    title: 'Text Normalization',
    body: (
      <>
        Fixes encoding issues, spacing, ligatures, and malformed symbols automatically.
      </>
    ),
  },
  {
    num: '06',
    icon: '▣',
    title: 'Multi-Template Support',
    body: (
      <>
        Supports IEEE, ACM, Springer, Elsevier, APA, and arXiv with isolated templates.
      </>
    ),
  },
];

const HOW_IT_WORKS = [
  {
    title: 'Drop your paper',
    body: 'Upload a PDF or DOCX — any format, any layout. Or paste raw text directly for a quick test.',
  },
  {
    title: 'Select a template',
    body: 'Choose from IEEE, ACM, Springer, Elsevier, APA, or arXiv. The formatter applies the correct .cls and style rules automatically.',
  },
  {
    title: 'Pipeline runs',
    body: 'Six stages fire in sequence: extract → parse → validate → normalize → render → compile. Watch the live log.',
  },
  {
    title: 'Download output',
    body: 'Get a clean .pdf and .tex. The .tex is fully editable for any final tweaks before submission.',
  },
];

export default function Features() {

useEffect(() => {
  const section = document.getElementById("features");
  if (!section) return;

  const cards = document.querySelectorAll(".feature-card");

  // Scroll animation
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      anime.default({
        targets: cards,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.95, 1],
        delay: anime.stagger(120),
        duration: 800,
        easing: "easeOutCubic",
      });
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(section);

  // 3D tilt
  cards.forEach((card) => {
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    };

    const handleLeave = () => {
      card.style.transform = `
        perspective(800px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
  });

}, []);

  return (
    <>
      {/* ── Feature cards ── */}
      <section className="features" id="features">
        <div className="features__eyebrow">Under the hood</div>
        <h2 className="features__title">
          Built for<br />
          <em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>academic precision.</em>
        </h2>
        <p className="features__sub">
          Built for real-world research PDFs — not ideal ones.
Handles broken layouts, missing structure, and noisy text using a multi-stage parsing pipeline.
        </p>

        <div className="features__grid">
          {FEATURE_CARDS.map((card) => (
            <div key={card.num} className="feature-card">
              <div className="feature-card__icon-wrap" aria-hidden="true">
                <span style={{ fontSize: 20 }}>{card.icon}</span>
              </div>
              <div>
                <div className="feature-card__num">{card.num} ——</div>
                <div className="feature-card__title">{card.title}</div>
              </div>
              <p className="feature-card__body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        className="features"
        id="how-it-works"
        style={{ paddingTop: 'var(--space-12)' }}
      >
        <div className="features__eyebrow">Process</div>
        <h2 className="features__title">How it works</h2>

        <div style={{ maxWidth: 560 }}>
          <div className="steps">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="step">
                <div className="step__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="step__title">{step.title}</div>
                <div className="step__body">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
