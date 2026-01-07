import React, { useState, useEffect, useRef } from 'react';
import './BubbleGame.css';

const BubbleGame = ({ width = 420, height = 300 }) => {
  const [bubbles, setBubbles] = useState([]);

  const animationRef = useRef(null);
  const releaseTimeoutRef = useRef(null);
  const bubbleIncrementIntervalRef = useRef(null);

  const isVisibleRef = useRef(!document.hidden);
  const globalSpeedRef = useRef(0.2);
  const bubblesPerReleaseRef = useRef(1);

  // ------------------------------------------------------------
  // Create a new bubble
  // ------------------------------------------------------------
  const createBubble = () => {
    const speedIncrement = 0.03;
    globalSpeedRef.current += speedIncrement;

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 50),
      y: -50 - Math.random() * 500,
      size: 50 + Math.random() * 50,
      speed: globalSpeedRef.current,
      popped: false,
    };
  };

  // ------------------------------------------------------------
  // Bubble popping
  // ------------------------------------------------------------
  const handlePop = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  // ------------------------------------------------------------
  // Start releasing bubbles (pausable)
  // ------------------------------------------------------------
  const startReleasingBubbles = () => {
    let delay = 700;
    const delayIncrement = 1;

    const releaseBubble = () => {
      if (!isVisibleRef.current) return;

      const count = bubblesPerReleaseRef.current;

      setBubbles((prev) => [
        ...prev,
        ...Array.from({ length: count }, () => createBubble()),
      ]);

      delay += delayIncrement;
      releaseTimeoutRef.current = setTimeout(releaseBubble, delay);
    };

    releaseBubble();

    bubbleIncrementIntervalRef.current = setInterval(() => {
      bubblesPerReleaseRef.current += 1;
    }, 10000);
  };

  // ------------------------------------------------------------
  // Start animation loop (pausable)
  // ------------------------------------------------------------
  const startAnimation = () => {
    const animate = () => {
      if (!isVisibleRef.current) return;

      setBubbles((prev) =>
        prev
          .map((b) => (b.popped ? b : { ...b, y: b.y + b.speed }))
          .filter((b) => b.y < height + b.size)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // ------------------------------------------------------------
  // Initial start + cleanup
  // ------------------------------------------------------------
  useEffect(() => {
    startReleasingBubbles();
    startAnimation();

    return () => {
      clearTimeout(releaseTimeoutRef.current);
      clearInterval(bubbleIncrementIntervalRef.current);
      cancelAnimationFrame(animationRef.current);
    };
  }, [height]);

  // ------------------------------------------------------------
  // Page Visibility API (pause / resume)
  // ------------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;

      if (!isVisibleRef.current) {
        // Pause everything
        clearTimeout(releaseTimeoutRef.current);
        clearInterval(bubbleIncrementIntervalRef.current);
        cancelAnimationFrame(animationRef.current);
      } else {
        // Resume
        startReleasingBubbles();
        startAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div
      className="game_window"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="game_bubble_layer">
        {bubbles.map(({ id, x, y, size, popped }) => (
          <span
            key={id}
            className={`game_bubble ${
              popped ? 'game_bubble_popped' : ''
            }`}
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
