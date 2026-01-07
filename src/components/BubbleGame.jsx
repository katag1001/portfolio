import React, { useState, useEffect, useRef } from 'react';
import './BubbleGame.css';

const BubbleGame = ({ width = 420, height = 300 }) => {
  const [bubbles, setBubbles] = useState([]);
  const animationRef = useRef();
  const globalSpeedRef = useRef(0.2); // << initial speed for the first bubble

  // Create a new bubble --------------------------------------------------------
  const createBubble = () => {
    const speedIncrement = 0.03; // <<< new bubble speed increase
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

// Continuously release bubbles with a slightly increasing interval -----------------------
useEffect(() => {
  let delay = 700;
  const delayIncrement = 30;

  const releaseBubble = () => {
    setBubbles((prev) => [...prev, createBubble()]);
    delay += delayIncrement; 
    setTimeout(releaseBubble, delay);
  };

  releaseBubble();

  return () => {};
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
          .map((b) => {
            if (b.popped) return b; 
            return { ...b, y: b.y + b.speed };
          })
          
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
