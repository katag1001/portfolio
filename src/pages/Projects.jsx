import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles.css';
import './projects.css';
import KatyImg from '../assets/me.jpg'; 


const Projects = () => {
  return (
    <div className="full_page">
      <Header />


<section className="projects_page">
  <div className="projects_grid">
    <div className="project_card">
      <img src="/images/project1.jpg" alt="Project 1" />
      <h3>Portfolio Website</h3>
      <p>Modern, responsive portfolio built with React and CSS animations.</p>
      <div className="skills">
        <span>React</span>
        <span>CSS</span>
        <span>UI/UX</span>
      </div>
    </div>

    <div className="project_card">
      <img src="/images/project2.jpg" alt="Project 2" />
      <h3>E-Commerce App</h3>
      <p>Full-stack web app with secure payments and user authentication.</p>
      <div className="skills">
        <span>Node.js</span>
        <span>MongoDB</span>
        <span>Stripe</span>
      </div>
    </div>

    <div className="project_card">
      <img src="/images/project2.jpg" alt="Project 2" />
      <h3>E-Commerce App</h3>
      <p>Full-stack web app with secure payments and user authentication.</p>
      <div className="skills">
        <span>Node.js</span>
        <span>MongoDB</span>
        <span>Stripe</span>
      </div>
    </div>

    <div className="project_card">
      <img src="/images/project2.jpg" alt="Project 2" />
      <h3>E-Commerce App</h3>
      <p>Full-stack web app with secure payments and user authentication.</p>
      <div className="skills">
        <span>Node.js</span>
        <span>MongoDB</span>
        <span>Stripe</span>
      </div>
    </div>

    <div className="project_card">
      <img src="/images/project2.jpg" alt="Project 2" />
      <h3>E-Commerce App</h3>
      <p>Full-stack web app with secure payments and user authentication.</p>
      <div className="skills">
        <span>Node.js</span>
        <span>MongoDB</span>
        <span>Stripe</span>
      </div>
    </div>

  </div>
</section>

      
    </div>
  );
};

export default Projects;

