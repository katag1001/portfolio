import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Wearable from '../assets/wearable.png';
import Orchestra from '../assets/orchestra.png';
import './styles.css';
import './projects.css';

const Projects = () => {
  return (
    <div className="full_page">
      <Header />

      <section className="projects_page">
        <div className="projects_grid">

          {/* Wearable Project */}
          <a
            href="https://wearable-psi.vercel.app/clothes"
            className="project_card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Wearable} alt="Wearable" />
            <h3>Wearable</h3>
             <p>Wearable is an intelligent wardrobe assistant web app that pairs combinations of your clothes and suggests the best outfit selection for the day according to the weather and your style preferences.</p>
            <div className="skills">
              <span>React</span>
              <span>CSS</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </a>

          {/* Orchestra Project */}
          <a
            href="https://sta-rehearsal-orchestra.vercel.app/"
            className="project_card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Orchestra} alt="St Albans Evening Rehearsal Orchestra" />
            <h3>St Albans Evening Rehearsal Orchestra</h3>
            <p>The St Albans Evening Rehearsal Orchestra site is a website that shows the orchestra’s schedule, rehearsal dates, and photos, making it easy for members and visitors to see what’s happening.</p>
            <div className="skills">
              <span>React</span>
              <span>CSS</span>
            </div>
          </a>

        </div>
      </section>
    </div>
  );
};

export default Projects;
