import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles.css';
import Wearable from '../assets/wearable.png';
import Orchestra from '../assets/orchestra.png';


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
    <a
      href="https://wearable-psi.vercel.app/clothes"
      className="project_card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={Wearable} alt="Wearable" />
      <h3>Wearable</h3>
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
      <img src={Orchestra} alt="St Albans Evening Rehearsal Orchestra" />
      <h3>St Albans Evening Rehearsal Orchestra</h3>
      <div className="skills">
        <span>React</span>
        <span>CSS</span>
      </div>
    </a>

  </div>
</section>


{/* Skills Section */}

<section className="skills_section">
  <h2 className="section_title">Skills & Technologies</h2>
  <div className="skills_grid">
    {['JavaScript', 'React', 'React Native', 'Node.js',  'CSS', 'SQL'].map((skill) => (
      <span key={skill} className="skill">{skill}</span>
    ))}
  </div>
</section>

  {/* Contact Section -TBD
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
      </section>*/}


    </div>

  );
};

export default Home;
