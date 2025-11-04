import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles.css';
import './about.css';

const About = () => {
  return (
    <div className="full_page">
      <Header />

      <section className="about_page">
        <div className="about_container">
        

          <div className="about_content">
            <h1 className="about_title">About Me</h1>
            <h2 className="about_subtitle">A creative mind with a love for storytelling and design.</h2>
            <p className="about_description">
              Hello! I’m Katy — a designer and developer passionate about crafting meaningful digital experiences. 
              My work blends thoughtful aesthetics with purposeful interaction, creating designs that are both visually striking 
              and intuitively functional. I believe in storytelling through design, finding beauty in simplicity, and always staying curious.
            </p>

            <Link to="/projects" className="cta_btn">View My Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
