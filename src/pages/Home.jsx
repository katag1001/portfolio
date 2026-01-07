import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SkillsBar from '../components/SkillsBar';
import EmailForm from '../components/EmailForm';

import './styles.css';
import MyPhoto from '../assets/me.png';

const Home = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(true); // <-- popup state
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleYes = () => {
    navigate('/bubble-game');
  };

  const handleNo = () => {
    setShowPopup(false);
  };

  return (
    <div className="full_page">
      {/* Bubble Background */}
      <div className="bubble_background">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="bubble" />
        ))}
      </div>

      <Header />
      <SkillsBar />

      {/* Main Section */}
      <section className="main_section">
        <div className="main_container">
          {/* Text */}
          <div className="main_content">
            <h1>Hi, I'm Katy.</h1>
            <h2>I'm a Full Stack Developer.</h2>
            <Link to="/projects" className="cta_btn">
              View My Work
            </Link>
          </div>

          {/* Image */}
          <div className="main_image">
            <img src={MyPhoto} alt="Katy" />
          </div>
        </div>
      </section>

      <EmailForm />

      {/* Popup Modal */}
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
