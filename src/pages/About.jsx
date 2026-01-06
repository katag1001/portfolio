import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles.css';
import './about.css';

const About = () => {
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
      <Header />

      {/* Bubble background */}
      <div className="bubble_background">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="bubble" />
        ))}
      </div>

      {/* Cursor glow */}
      <div
        className="cursor_glow"
        style={{ left: cursor.x, top: cursor.y }}
      />

      <section className="about_page">
        <div className="about_container">
          <div className="about_content">
            <h1 className="about_title">About Me</h1>
            <h2 className="about_subtitle">
              Full Stack Developer and Creative Mind
            </h2>

            <p className="about_description">
              I’m a full stack developer who has just completed an intensive web
              development course, and I’m excited to bring my skills to
              real-world projects. With extensive experience in data analysis,
              particularly using SQL and Power BI, I thrive on turning complex
              datasets into actionable insights. I’m equally comfortable diving
              into code as I am collaborating across multiple teams, organizing
              large projects, and communicating findings in a way that actually
              makes sense to people.
            </p>

            <p className="about_description">
              Outside of work, I’m happiest making things come to life. Whether
              it’s coding a new app or tailoring clothing inspired by designs I
              find on Pinterest, I love seeing a project through from idea to
              finished product. Creativity and attention to detail are just as
              important to me as analytical thinking, and I bring that same
              energy and care to every project I take on.
            </p>

            <Link to="/projects" className="cta_btn">
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
