// src/components/Hero/Hero.jsx
import Button from '../Button/Button';

export default function Hero({ onScrollToFormatter }) {
  return (
    <section className="hero">
      {/* Ambient background orbs */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
      </div>

      <div className="hero__content">
        {/* Eyebrow */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          <span className="hero__eyebrow-text">
            IEEE · ACM · Springer · Elsevier · APA · arXiv
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero__headline">
          <span className="hero__headline-line1">Research papers,</span>
          <span className="hero__headline-line2">perfectly formatted.</span>
        </h1>

        {/* Sub */}
        <p className="hero__sub">
          Drop any PDF or DOCX — messy, semi-structured, raw.
          Get back a clean <code>.pdf</code> + <code>.tex</code> in your target
          academic template. No manual LaTeX required.
        </p>

        {/* CTA */}
        <div className="hero__cta">
          <Button
            size="xl"
            variant="primary"
            onClick={onScrollToFormatter}
          >
            Format a paper
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="8" x2="14" y2="8" />
              <polyline points="10 4 14 8 10 12" />
            </svg>
          </Button>
          <Button
            size="xl"
            variant="secondary"
            as="a"
            href="#how-it-works"
          >
            How it works
          </Button>
          <span className="hero__cta-hint">Free · No signup</span>
        </div>

    
      </div>
    </section>
  );
}
