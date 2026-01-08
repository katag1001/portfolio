import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SkillsBar from '../components/SkillsBar';
import EmailForm from '../components/EmailForm';

import './styles.css';
import MyPhoto from '../assets/me.png';




const Home = () => {

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const skills = [
  "JavaScript",
  "MongoDB",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('hasSeenPopup', 'true'); 
    navigate('/bubble-game');
  };

  const handleNo = () => {
    localStorage.setItem('hasSeenPopup', 'true'); 
    setShowPopup(false);
  };

  return (
    <div className="full_page">
      <div className="bubble_background">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="bubble" />
        ))}
      </div>

      <Header />
      <SkillsBar items={skills} />

      <section className="main_section">
        <div className="main_container">
          <div className="main_content">
            <h1>Hi, I'm Katy.</h1>
            <h2>I'm a Full Stack Developer.</h2>
            <Link to="/projects" className="cta_btn">
              View My Work
            </Link>
          </div>

          <div className="main_image">
            <img src={MyPhoto} alt="Katy" />
          </div>
        </div>
      </section>

      <EmailForm />

      {showPopup && (
        <div className="popup_overlay">
          <div className="popup_modal">
            <h3>Bored of looking at CVs? Wanna play a bubble game instead?</h3>
            <div className="popup_buttons">
              <button className="popup_yes" onClick={handleYes}>
                Hell yeah!
              </button>
              <button className="popup_no" onClick={handleNo}>
                No thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
