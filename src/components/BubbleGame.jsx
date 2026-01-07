import React, { useState, useEffect, useRef } from 'react';
import './BubbleGame.css';

const BubbleGame = ({ bubbleCount = 5, width = 420, height = 300 }) => {
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
      speed: newSpeed, // constant speed
      popped: false,
    };
  };

  // Release bubbles at random intervals until we reach bubbleCount
  useEffect(() => {
    const releaseBubble = () => {
      setBubbles((prev) => [...prev, createBubble()]);
      const nextDelay = 500 + Math.random() * 1000; // random interval
      setTimeout(releaseBubble, nextDelay);
    };
    releaseBubble();
  }, [bubbleCount]);

  // Pop a bubble
  const handlePop = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Remove popped bubble and spawn new one after 0.3s
    setTimeout(() => {
      setBubbles((prev) =>
        prev.filter((b) => b.id !== id).concat([createBubble()])
      );
    }, 300);
  };

  // Animate bubbles at constant speed
  useEffect(() => {
    const animate = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          return { ...b, y: b.y + b.speed }; // move at constant speed
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

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
