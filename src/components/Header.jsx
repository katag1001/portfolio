import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './header.css';
import '../pages/styles.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">

      {/* Cursor glow */}
      <div
        className="cursor_glow"
        style={{ left: cursor.x, top: cursor.y }}
      />

      <div className="header_container">

        {/* LEFT: menu toggle + nav */}
        <div className="header_left">
          {/* Menu toggle for mobile */}
          <div
            className={`menu_toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation */}
          <nav className={`header_nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav_link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/projects" className="nav_link" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
            {/*<Link to="/about-me" className="nav_link" onClick={() => setMenuOpen(false)}>
              About
            </Link>*/}
            <Link to="/bubble-game" className="nav_link" onClick={() => setMenuOpen(false)}>
              Bubble Game
            </Link>
          </nav>
        </div>

        {/* RIGHT: socials + resume */}
        <div className="header_right">
          <a
            href="https://github.com/katag1001"
            className="icon_btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/katarina-grantham-1b54a45b/"
            className="icon_btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="/Katarina_Grantham_CV.pdf"
            className="resume_btn"
            download="Katarina_Grantham_CV.pdf"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
