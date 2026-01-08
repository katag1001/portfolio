import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import BubbleCard from '../components/BubbleCard';

import WearableLogo from '../assets/wearable_logo.png';
import OrchestraLogo from '../assets/sta_logo.png';

import WearableImage from '../assets/wearable.png';
import OrchestraImage from '../assets/orchestra.png';

import './projects.css';

const NUM_DECORATIVE_BUBBLES = 10;

const projectData = [
  {
    title: "Wearable",
    coverImage: WearableLogo,
    link: "https://wearable-psi.vercel.app/",
    images: [
      { src: WearableImage, caption: 'AI-powered outfit recommendations' },
      { src: WearableImage, caption: 'Weather-based clothing suggestions' },
      { src: WearableImage, caption: 'Personal wardrobe management' },
    ],
  },
  {
    title: "St Albans Evening Rehearsal Orchestra",
    coverImage: OrchestraLogo,
    link: "https://sta-rehearsal-orchestra.vercel.app/",
    images: [
      { src: OrchestraImage, caption: 'Rehearsal schedule overview' },
      { src: OrchestraImage, caption: 'Orchestra gallery and events' },
    ],
  },
];


const Projects = () => {
  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const elements = Array.from(container.querySelectorAll('.bouncing_bubble'));

    const items = elements.map((el) => {
      const size = parseInt(el.dataset.size, 10);
      return {
        el,
        x: Math.random() * (container.offsetWidth - size),
        y: Math.random() * (container.offsetHeight - size),
        vx: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        size,
        isCard: el.querySelector('.bubble_card') !== null,
      };
    });

    function animate() {
      items.forEach((item, idx) => {
        item.x += item.vx;
        item.y += item.vy;

        if (item.x <= 0 || item.x + item.size >= container.offsetWidth) item.vx *= -1;
        if (item.y <= 0 || item.y + item.size >= container.offsetHeight) item.vy *= -1;

        if (item.isCard) {
          for (let j = 0; j < items.length; j++) {
            if (j === idx) continue;
            const other = items[j];
            if (!other.isCard) continue;

            const dx = item.x + item.size / 2 - (other.x + other.size / 2);
            const dy = item.y + item.size / 2 - (other.y + other.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = (item.size + other.size) / 2 + 20;

            if (distance < minDist) {
              const angle = Math.atan2(dy, dx);
              const overlap = minDist - distance;
              item.x += Math.cos(angle) * (overlap / 2);
              item.y += Math.sin(angle) * (overlap / 2);
              other.x -= Math.cos(angle) * (overlap / 2);
              other.y -= Math.sin(angle) * (overlap / 2);
              item.vx *= -1;
              item.vy *= -1;
              other.vx *= -1;
              other.vy *= -1;
            }
          }
        }

        item.el.style.left = `${item.x}px`;
        item.el.style.top = `${item.y}px`;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const openModal = (project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProject(null);
  };

  return (
    <div className="full_page">
      <Header />

      {/* Bubbles container */}
      <div
        className={`bubble_background2 ${modalOpen ? 'bubbles_beneath_modal' : ''}`}
        ref={containerRef}
      >
        {Array.from({ length: NUM_DECORATIVE_BUBBLES }).map((_, idx) => {
          const size = 50 + Math.random() * 100;
          return (
            <div
              key={idx}
              className="bouncing_bubble decorative_bubble"
              data-size={size}
              style={{ width: size, height: size }}
            />
          );
        })}

        {projectData.map((proj, idx) => (
          <div
            key={idx}
            className="bouncing_bubble"
            data-size={240}
            style={{ width: 240, height: 240 }}
          >
            <BubbleCard
              title={proj.title}
              coverImage={proj.coverImage}
              images={proj.images}
              onClick={() => openModal(proj)}
            />
          </div>
        ))}
      </div>

      {/* Modal rendered outside of bubbles */}
      {modalOpen && currentProject && (
        <div className="bubble_modal">
          <div className="bubble_overlay" onClick={closeModal} />

          <div className="bubble_content">
            <button className="close_btn" onClick={closeModal}>✕</button>
            <h2 className="bubble_title">
  <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
    {currentProject.title}
  </a>
</h2>
            <div className="bubble_slider">
              {currentProject.images.map((img, i) => (
                <div className="bubble_slide" key={i}>
                  <img src={img.src} alt={`${currentProject.title} ${i}`} />
                  <p>{img.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
