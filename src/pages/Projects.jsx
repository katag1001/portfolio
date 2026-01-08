import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import SkillsBar from '../components/SkillsBar';
import BubbleCard from '../components/BubbleCard';
import ProjectModal from '../components/ProjectModal';

import WearableLogo from '../assets/wearable_logo.png';
import WearableLogin from '../assets/wearable_login.png';
import WearableClothes from '../assets/wearable_clothes.png';
import WearableOutfits from '../assets/wearable_outfits.png';
import WearableBuilder from '../assets/wearable_builder.png';
import WearableToday from '../assets/wearable_today.png';

import OrchestraLogo from '../assets/sta_logo.png';
import OrchestraImage from '../assets/orchestra.png';
import OrchestraGallery from '../assets/sta_gallery.png';
import OrchestraMap from '../assets/sta_map.png';

import TravlrLogo from '../assets/travlr_logo.png';
import TravlrJapan from '../assets/travlr_japan.jpg';
import TravlrDubai from '../assets/travlr_dubai.jpg';
import TravlrItinerary from '../assets/travlr_itinerary.jpg';
import TravlrPacking from '../assets/travlr_packing.jpg';
import TravlrBudget from '../assets/travlr_budget.jpg';
import TravlrDay from '../assets/travlr_day.jpg';
import TravlrTransport from '../assets/travlr_transport.jpg';
import TravlrHotel from '../assets/travlr_hotel.jpg';

import './projects.css';

const NUM_DECORATIVE_BUBBLES = 12;

const projectData = [
  {
    title: "Wearable",
    coverImage: WearableLogo,
    link: "https://wearable-psi.vercel.app/",
    images: [
      { src: WearableLogin, caption: 'Login to view and pair your clothes. Database powered by MongoDB.' },
      { src: WearableClothes, caption: 'Upload and view your clothes. Everything will automatically be paired with other items on upload' },
      { src: WearableOutfits, caption: 'Automatic pairing algorithm will pair up to 3 items and automatically give temperatures and seasons depending on the items used. Everything is matched based on season, color, pattern and temperature.' },
      { src: WearableBuilder, caption: 'The user can also put together their own outfits.' },
      { src: WearableToday, caption: 'Location and weather API will combine with the database of outfits to suggest options for today. The options are ranked to ensure the same outfits are not suggested on consecutive days.' },
    ],
  },
  {
    title: "St Albans Evening Rehearsal Orchestra",
    coverImage: OrchestraLogo,
    link: "https://sta-rehearsal-orchestra.vercel.app/",
    images: [
      { src: OrchestraImage, caption: 'Official site for the St Albans Evening Rehearsal Orchestra to view events, itineraries, rehearsal lists and contact details.' },
      { src: OrchestraMap, caption: 'Google Maps integration for venue locations' },
      { src: OrchestraGallery, caption: 'Toggle around different galleries that will feed the correct pictures automatically.' },
    ],
  },
    {
    title: "Travlr Mobile App",
    coverImage: TravlrLogo,
    images: [
      { src: TravlrJapan, caption: 'Add trips so that you can organise your travel plans' },
      { src: TravlrDubai, caption: 'Different destinations will trigger fun backgrounds that match' },

      { src: TravlrTransport, caption: 'Pick from a dropdown of transportation options.' },
      { src: TravlrHotel, caption: 'Add in all your hotels in one convenient place.' },
      { src: TravlrItinerary, caption: 'Check out your itinerary in the calendar function' },
      { src: TravlrDay, caption: 'Hotels and transport will automatically be added to the itinerary. Hotel costs will be split over the number of nights.' },
      { src: TravlrBudget, caption: 'Add different budgets that will total at the top. All trips will have automatic transport and hotel budgets.' },
      { src: TravlrPacking, caption: 'Add as many packing lists as you like and then add and tick off items' },
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

  const scrollbar = [
  "Select a bubble to take a look at my projects!",
];

  return (
    <div className="full_page">
      <Header />
      <SkillsBar items={scrollbar} />

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

      <ProjectModal
        isOpen={modalOpen}
        project={currentProject}
        onClose={closeModal}
      />
    </div>
  );
};

export default Projects;
