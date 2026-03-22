// src/components/Footer/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__brand-logo">
            <div className="footer__brand-icon">P</div>
            <span className="footer__brand-name">PaperFormat</span>
          </div>
          <p className="footer__brand-desc">
            An open-source tool for reformatting academic research papers
           
          </p>
        </div>

        {/* Templates */}
        <div>
          <div className="footer__col-title">Templates</div>
          <ul className="footer__links">
            {['IEEE', 'ACM', 'Springer', 'Elsevier', 'APA', 'arXiv'].map((t) => (
              <li key={t}>
                <a href="#formatter" className="footer__link">{t}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <div className="footer__col-title">Resources</div>
          <ul className="footer__links">
            <li><a href="#docs" className="footer__link">Documentation</a></li>
            <li><a href="#" className="footer__link">GitHub</a></li>
            <li><a href="#" className="footer__link">CLAUDE.md</a></li>
            <li><a href="#" className="footer__link">Changelog</a></li>
          </ul>
        </div>

        {/* Pipeline */}
        <div>
          <div className="footer__col-title">Pipeline</div>
          <ul className="footer__links">
            {['Extract', 'Parse', 'Canon', 'Normalize', 'Render', 'Compile'].map((s) => (
              <li key={s}>
                <a href="#how-it-works" className="footer__link">{s}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span className="footer__copy">
          © {year} PaperFormat · Built with React + Vite · anime.js
        </span>
        <div className="footer__legal">
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
