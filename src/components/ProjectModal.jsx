import React, { useState, useEffect, useRef } from 'react';
import './projectModal.css';

const ProjectModal = ({ isOpen, project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);
  const [imageHeight, setImageHeight] = useState('auto');

  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  useEffect(() => {
    const adjustLayout = () => {
      if (!imgRef.current || !contentRef.current) return;

      const img = imgRef.current;
      const container = contentRef.current;

      const padding = 64; // bubble_content padding top+bottom
      const spacing = 16; // space between image and text
      const maxHeight = container.clientHeight - padding;

      // Determine orientation
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const portrait = naturalHeight >= naturalWidth;
      setIsPortrait(portrait);

      // Calculate max image height
      let maxImgHeight;
      if (portrait) {
        maxImgHeight = maxHeight * 0.8; // leave some space for text
      } else {
        maxImgHeight = maxHeight * 0.6; // leave more space for text below
      }

      setImageHeight(Math.min(naturalHeight, maxImgHeight));
    };

    const img = imgRef.current;
    if (img && img.complete) {
      adjustLayout();
    } else if (img) {
      img.onload = adjustLayout;
    }

    window.addEventListener('resize', adjustLayout);
    return () => window.removeEventListener('resize', adjustLayout);
  }, [currentIndex, project]);

  if (!isOpen || !project) return null;

  const totalImages = project.images.length;
  const currentImage = project.images[currentIndex];

  const goPrev = () => setCurrentIndex(prev => (prev === 0 ? totalImages - 1 : prev - 1));
  const goNext = () => setCurrentIndex(prev => (prev === totalImages - 1 ? 0 : prev + 1));

  return (
    <div className="bubble_modal">
      <div className="bubble_overlay" onClick={onClose} />

      <div className="bubble_content" ref={contentRef}>
        <button className="close_btn" onClick={onClose}>✕</button>

        <h2 className="bubble_title">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>

        <div className={`bubble_slide_container ${isPortrait ? 'portrait' : 'landscape'}`}>
          <img
            ref={imgRef}
            src={currentImage.src}
            alt={`${project.title} ${currentIndex}`}
            style={{
              height: `${imageHeight}px`,
              width: isPortrait ? '50%' : 'auto',
              maxWidth: '100%',
            }}
          />
          <p>{currentImage.caption}</p>
        </div>

        {totalImages > 1 && (
          <>
            <button className="carousel_arrow prev" onClick={goPrev}>‹</button>
            <button className="carousel_arrow next" onClick={goNext}>›</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
