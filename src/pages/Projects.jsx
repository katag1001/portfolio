import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import BubbleCard from '../components/BubbleCard';

import WearableLogo from '../assets/wearable_logo.png';
import OrchestraLogo from '../assets/sta_logo.png';

import WearableImage from '../assets/wearable.png';
import OrchestraImage from '../assets/orchestra.png';

import './projects.css';

const NUM_DECORATIVE_BUBBLES = 10;

const Projects = () => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const elements = Array.from(container.querySelectorAll('.bouncing_bubble'));

    // Initialize positions and velocities
    const items = elements.map((el) => {
      const size = parseInt(el.dataset.size, 10);
      return {
        el,
        x: Math.random() * (container.offsetWidth - size),
        y: Math.random() * (container.offsetHeight - size),
        vx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
        size,
      };
    });

    function animate() {
      items.forEach((item) => {
        item.x += item.vx;
        item.y += item.vy;

        // Bounce off walls
        if (item.x <= 0 || item.x + item.size >= container.offsetWidth) item.vx *= -1;
        if (item.y <= 0 || item.y + item.size >= container.offsetHeight) item.vy *= -1;

        // Apply position
        item.el.style.left = `${item.x}px`;
        item.el.style.top = `${item.y}px`;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="full_page">
      <Header />

      {/* Bubble container */}
      <div className="bubble_background2" ref={containerRef}>
  {/* Decorative bubbles */}
  {Array.from({ length: NUM_DECORATIVE_BUBBLES }).map((_, idx) => {
    const size = 50 + Math.random() * 100;
    return <div key={idx} className="bouncing_bubble decorative_bubble" data-size={size} style={{ width: size, height: size }} />;
  })}

  {/* Project bubbles */}
  <div
    className="bouncing_bubble"
    data-size={240}
    style={{ width: 240, height: 240 }}
  >
    <BubbleCard
      title="Wearable"
      coverImage={WearableLogo}
      images={[
        { src: WearableImage, caption: 'AI-powered outfit recommendations' },
        { src: WearableImage, caption: 'Weather-based clothing suggestions' },
        { src: WearableImage, caption: 'Personal wardrobe management' }
      ]}
    />
  </div>

  <div
    className="bouncing_bubble"
    data-size={240}
    style={{ width: 240, height: 240 }}
  >
    <BubbleCard
      title="St Albans Evening Rehearsal Orchestra"
      coverImage={OrchestraLogo}
      images={[
        { src: OrchestraImage, caption: 'Rehearsal schedule overview' },
        { src: OrchestraImage, caption: 'Orchestra gallery and events' }
      ]}
    />
  </div>
</div>

    </div>
  );
};

export default Projects;
