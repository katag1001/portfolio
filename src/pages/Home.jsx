import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles.css';


const Home = () => {
  return (
    <div className="full_page">
      <Header />

{/* main Section */}
<section className="main_section">
  <div className="main_container">
    
    <div className="main_content">
      <h1>Hi, I'm Katy.</h1>
      <h2>I'm a Full Stack Developer.</h2>
      <Link to="/projects" className="cta_btn">View My Work</Link>
    </div>
  </div>
</section>
      



{/* Projects Section */}
<section className="projects_section">
  <h2 className="section_title">Featured Projects</h2>
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
  </div>
</section>


{/* Skills Section */}
<section className="skills_section">
  <h2 className="section_title">Skills & Technologies</h2>
  <div className="skills_grid">
    {['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'AWS'].map((skill) => (
      <span key={skill} className="skill">{skill}</span>
    ))}
  </div>
</section>


      {/* Contact Section */}
      <section className="contact_section">
        <h2 className="section_title">Get In Touch</h2>
        <form className="contact_form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit" className="contact_btn">Send Message</button>
        </form>
        <div className="social_links">
          <a href="https://github.com/katag1001" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/katarina-grantham-1b54a45b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
