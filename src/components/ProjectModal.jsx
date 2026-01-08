// components/ProjectModal.jsx
import React, { useState } from 'react';
import './projectModal.css';

const ProjectModal = ({ isOpen, project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !project) return null;

  const totalImages = project.images.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

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
          {/* Slide viewport */}
          <div className="carousel_viewport">
            <div
              className="carousel_track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {project.images.map((img, idx) => (
                <div className="bubble_slide" key={idx}>
                  <img src={img.src} alt={`${project.title} ${idx}`} />
                  <p>{img.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalImages > 1 && (
            <>
              <button className="carousel_arrow prev" onClick={goPrev}>‹</button>
              <button className="carousel_arrow next" onClick={goNext}>›</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
