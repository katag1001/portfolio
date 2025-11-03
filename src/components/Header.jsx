import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header_container">


        <nav className="header_nav">
          <Link to="/" className="nav_link">Home</Link>
          <Link to="/projects" className="nav_link">Projects</Link>
          <Link to="/skills" className="nav_link">Skills</Link>
          <Link to="/contact" className="nav_link">Contact</Link>
        </nav>

        <div className="header_cta">
          <a /*href="/resume.pdf"*/ className="resume_btn" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
