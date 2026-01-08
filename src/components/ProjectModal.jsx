// components/ProjectModal.jsx
import React from 'react';
import './projectModal.css';

const ProjectModal = ({ isOpen, project, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="bubble_modal">
      <div className="bubble_overlay" onClick={onClose} />

      <div className="bubble_content">
        <button className="close_btn" onClick={onClose}>✕</button>

        <h2 className="bubble_title">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h2>

        <div className="bubble_slider">
          {project.images.map((img, i) => (
            <div className="bubble_slide" key={i}>
              <img src={img.src} alt={`${project.title} ${i}`} />
              <p>{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
