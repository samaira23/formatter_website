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
