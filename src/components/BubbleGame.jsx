import React, { useState, useEffect, useRef } from 'react';
import './BubbleGame.css';

const BubbleGame = ({ width = 420, height = 300 }) => {
  const [bubbles, setBubbles] = useState([]);
  const animationRef = useRef();
  const globalSpeedRef = useRef(0.2); // initial speed for the first bubble

  // Create a new bubble
  const createBubble = () => {
    const speedIncrement = 0.02; // each new bubble slightly faster
    const newSpeed = globalSpeedRef.current + speedIncrement;
    globalSpeedRef.current = newSpeed;

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 50),
      y: 0,
      size: 50 + Math.random() * 50,
      speed: newSpeed,
      popped: false,
    };
  };

  // Continuously release bubbles at a consistent interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => [...prev, createBubble()]);
    }, 500); // release a bubble every 700ms

    return () => clearInterval(interval);
  }, []);

  // Pop a bubble (play animation then remove)
  const handlePop = (id) => {
    // mark as popped to trigger animation
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // remove the bubble after animation duration (e.g., 300ms)
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  // Animate bubbles at constant speed
  useEffect(() => {
    const animate = () => {
      setBubbles((prev) =>
        prev
          .map((b) => {
            if (b.popped) return b; // don't move popped bubbles
            return { ...b, y: b.y + b.speed };
          })
          // Remove bubbles that have floated off the top
          .filter((b) => b.y < height + b.size)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [height]);

  return (
    <div className="game_window" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="game_bubble_layer">
        {bubbles.map(({ id, x, y, size, popped }) => (
          <span
            key={id}
            className={`game_bubble ${popped ? 'game_bubble_popped' : ''}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}px`,
              bottom: `${y}px`,
            }}
            onMouseEnter={() => handlePop(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleGame;
