import React, { useState, useEffect } from 'react';
import './BubbleGame.css';

const BubbleGame = ({
  bubbleCount = 10,
  width = '420px',
  height = '300px',
}) => {
  const [bubbles, setBubbles] = useState([]);

  const createBubble = (id) => {
    const size = 50 + Math.random() * 100;
    const left = Math.random() * 90;
    const duration = 15 + Math.random() * 15;
    const delay = Math.random() * 15; 
    return { id, size, left, duration, delay, popped: false };
  };

  // Initialize bubbles
  useEffect(() => {
    setBubbles(Array.from({ length: bubbleCount }, (_, i) => createBubble(i)));
  }, [bubbleCount]);

  const handlePop = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBubbles((prev) =>
        prev
          .filter((b) => b.id !== id) 
          .concat([createBubble(Date.now())]) 
      );
    }, 300);
  };

  return (
    <div className="game_window" style={{ width, height }}>
      <div className="game_bubble_layer">
        {bubbles.map(({ id, size, left, duration, delay, popped }) => (
          <span
            key={id}
            className={`game_bubble ${popped ? 'game_bubble_popped' : ''}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
            onMouseEnter={() => handlePop(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleGame;
