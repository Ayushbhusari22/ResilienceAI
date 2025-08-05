import { LifeBuoy } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <LifeBuoy className="footer-icon" />
              <span className="footer-logo-text">DisasterAI</span>
            </div>
            <p className="footer-slogan">
              Empowering communities with AI-driven disaster management solutions.
            </p>
          </div>
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Features</li>
              <li>Case Studies</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>GitHub</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 DisasterAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;