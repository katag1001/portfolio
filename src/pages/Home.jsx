import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SkillsBar from '../components/SkillsBar';
import EmailForm from '../components/EmailForm';


import './styles.css';
import Wearable from '../assets/wearable.png';
import Orchestra from '../assets/orchestra.png';

const Home = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="full_page">
      {/* Bubble Background */}
      <div className="bubble_background">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            onMouseEnter={(e) => {
              e.currentTarget.classList.add('popped');
              // Remove bubble from DOM after animation
              setTimeout(() => e.currentTarget.remove(), 300);
            }}
          />
        ))}
      </div>

      {/* Header and Skills */}
      <Header />
      <SkillsBar />



      {/* Cursor Glow */}
      <div
        className="cursor_glow"
        style={{ left: cursor.x, top: cursor.y }}
      />

      {/* Main Section */}
      <section className="main_section">
        <div className="main_container">
          <div className="main_content">
            <h1>Hi, I'm Katy.</h1>
            <h2>I'm a Full Stack Developer.</h2>
            <Link to="/projects" className="cta_btn">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      <EmailForm /> 

      {/* Projects Section 
      <section className="projects_section">
        <h2 className="section_title">Featured Projects</h2>

        <div className="projects_grid">
          <a
            href="https://wearable-psi.vercel.app/clothes"
            className="project_card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Wearable</h3>
            <img src={Wearable} alt="Wearable" />
            <div className="skills">
              <span>React</span>
              <span>CSS</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </a>

          <a
            href="https://sta-rehearsal-orchestra.vercel.app/"
            className="project_card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>St Albans Evening Rehearsal Orchestra</h3>
            <img src={Orchestra} alt="St Albans Evening Rehearsal Orchestra" />
            <div className="skills">
              <span>React</span>
              <span>CSS</span>
            </div>
          </a>
        </div>
      </section>*/}


    </div>
  );
};

export default Home;
