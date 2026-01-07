import React, { useState, useEffect, useRef } from 'react';
import './BubbleGame.css';

const BubbleGame = ({ width = 420, height = 300 }) => {
  const [bubbles, setBubbles] = useState([]);
  const animationRef = useRef();
  const globalSpeedRef = useRef(0.2);

  // Keep track of how many bubbles to release at a time
  const bubblesPerReleaseRef = useRef(1); 
  const bubbleIncrementIntervalRef = useRef();

  // Create a new bubble --------------------------------------------------------
  const createBubble = () => {
    const speedIncrement = 0.03;
    const newSpeed = globalSpeedRef.current + speedIncrement;
    globalSpeedRef.current = newSpeed;

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 50),
      y: -50 - Math.random() * 500,
      size: 50 + Math.random() * 50,
      speed: newSpeed,
      popped: false,
    };
  };

  // Continuously release bubbles ------------------------------------------------
  useEffect(() => {
    let delay = 700;
    const delayIncrement = 1;

    const releaseBubble = () => {
      const count = bubblesPerReleaseRef.current;

      // Add 'count' bubbles at once
      setBubbles((prev) => [
        ...prev,
        ...Array.from({ length: count }, () => createBubble()),
      ]);

      delay += delayIncrement;
      setTimeout(releaseBubble, delay);
    };

    releaseBubble();

    // Every 5 seconds, increase bubbles per release
    bubbleIncrementIntervalRef.current = setInterval(() => {
      bubblesPerReleaseRef.current += 1;
    }, 10000);

    return () => clearInterval(bubbleIncrementIntervalRef.current);
  }, []);

  // Bubble pop ----------------------------------------------------------------
  const handlePop = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  // Animate bubbles ----------------------------------------------------
  useEffect(() => {
    const animate = () => {
      setBubbles((prev) =>
        prev
          .map((b) => (b.popped ? b : { ...b, y: b.y + b.speed }))
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
