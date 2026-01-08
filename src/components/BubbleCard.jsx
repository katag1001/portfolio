import React from 'react';
import './bubbleCard.css';

const BubbleCard = ({ title, coverImage, onClick }) => {
  return (
    <div className="bubble_card" onClick={onClick}>
      <img src={coverImage} alt={`${title} cover`} />
      <div className="bubble_overlay_text">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default BubbleCard;
