import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header_container">
        <nav className="header_nav">
          <Link to="/" className="nav_link">Home</Link>
          <Link to="/projects" className="nav_link">Projects</Link>
          <Link to="/about-me" className="nav_link">About</Link>
        </nav>

        <div className="header_cta">
          <a 
            href="/resume.pdf" 
            className="resume_btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Resume
          </a>

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
        </div>
      </div>
    </header>
  );
}

export default Header;
