import React, { useState } from 'react';
import './bubbleCard.css';

const BubbleCard = ({ title, coverImage, images }) => {
  const [open, setOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="bubble_card" onClick={() => setOpen(true)}>
  <img src={coverImage} alt={`${title} cover`} />
  <div className="bubble_overlay_text">
    <h3>{title}</h3>
  </div>
</div>

      {open && (
        <div className="bubble_modal">
          <div
            className="bubble_overlay"
            onClick={() => setOpen(false)}
          />

          <div className="bubble_content">
            <button
              className="close_btn"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="bubble_title">{title}</h2>

            <div className="bubble_slider">
              {images.map((image, index) => (
                <div className="bubble_slide" key={index}>
                  <img
                    src={image.src}
                    alt={`${title} screenshot ${index + 1}`}
                  />
                  <p>{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BubbleCard;
