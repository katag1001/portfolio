import React, { useState, useEffect, useRef } from 'react';
import './bubbleGame.css';

const LAST_SCORE_KEY = 'bubbleGame_lastScore';
const BEST_SCORE_KEY = 'bubbleGame_bestScore';

const BubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [scoreMessage, setScoreMessage] = useState('');

  const containerRef = useRef(null);
  const containerHeightRef = useRef(0);

  const animationRef = useRef(null);
  const releaseTimeoutRef = useRef(null);
  const bubbleIncrementIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const isVisibleRef = useRef(!document.hidden);
  const gameStartedRef = useRef(false);
  const gameOverRef = useRef(false);
  const timePlayedRef = useRef(0);

  const globalSpeedRef = useRef(0.25);
  const bubblesPerReleaseRef = useRef(1);

  /* ------------------------------------------------------------ */
  const stopAllLoops = () => {
    clearTimeout(releaseTimeoutRef.current);
    clearInterval(bubbleIncrementIntervalRef.current);
    clearInterval(timerIntervalRef.current);
    cancelAnimationFrame(animationRef.current);
  };

  /* ------------------------------------------------------------ */
  const measureContainer = () => {
    if (containerRef.current) {
      containerHeightRef.current =
        containerRef.current.getBoundingClientRect().height;
    }
  };

  /* ------------------------------------------------------------ */
  const createBubble = () => {
    const size = 40 + Math.random() * 40;
    globalSpeedRef.current += 0.02;

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (containerRef.current.clientWidth - size),
      y: containerHeightRef.current + size, // start BELOW
      size,
      speed: globalSpeedRef.current,
      popped: false,
    };
  };

  /* ------------------------------------------------------------ */
  const handlePop = (id) => {
    if (!gameStartedRef.current) return;

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  /* ------------------------------------------------------------ */
  const startReleasingBubbles = () => {
    let delay = 700;

    const release = () => {
      if (!gameStartedRef.current || !isVisibleRef.current) return;

      setBubbles((prev) => [
        ...prev,
        ...Array.from(
          { length: bubblesPerReleaseRef.current },
          createBubble
        ),
      ]);

      delay += 2;
      releaseTimeoutRef.current = setTimeout(release, delay);
    };

    release();

    bubbleIncrementIntervalRef.current = setInterval(() => {
      bubblesPerReleaseRef.current += 1;
    }, 10000);
  };

  /* ------------------------------------------------------------ */
  const startAnimation = () => {
    const animate = () => {
      if (gameStartedRef.current && isVisibleRef.current) {
        setBubbles((prev) => {
          for (const b of prev) {
            if (!b.popped && b.y <= 0) {
              triggerGameOver();
              return prev;
            }
          }

          return prev.map((b) =>
            b.popped ? b : { ...b, y: b.y - b.speed }
          );
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  /* ------------------------------------------------------------ */
  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      timePlayedRef.current += 1;
      setTimePlayed(timePlayedRef.current);
    }, 1000);
  };

  /* ------------------------------------------------------------ */
  const triggerGameOver = () => {
    if (gameOverRef.current) return;

    gameOverRef.current = true;
    gameStartedRef.current = false;

    stopAllLoops();
    setGameStarted(false);
    setGameOver(true);

    const finalTime = timePlayedRef.current;
    const lastScore = Number(localStorage.getItem(LAST_SCORE_KEY)) || 0;
    const bestScore = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;

    localStorage.setItem(LAST_SCORE_KEY, finalTime);
    if (finalTime > bestScore) {
      localStorage.setItem(BEST_SCORE_KEY, finalTime);
      setScoreMessage(`New best score! 🎉 ${finalTime} seconds`);
    } else if (finalTime > lastScore) {
      setScoreMessage(`Nice! ${finalTime - lastScore}s better than last time 👏`);
    } else {
      setScoreMessage('');
    }
  };

  /* ------------------------------------------------------------ */
  const startGame = () => {
    stopAllLoops();
    measureContainer();

    setBubbles([]);
    setGameOver(false);
    setScoreMessage('');
    setTimePlayed(0);

    timePlayedRef.current = 0;
    gameStartedRef.current = true;
    gameOverRef.current = false;

    globalSpeedRef.current = 0.25;
    bubblesPerReleaseRef.current = 1;

    setGameStarted(true);

    startReleasingBubbles();
    startAnimation();
    startTimer();
  };

  /* ------------------------------------------------------------ */
useEffect(() => {
  const handleVisibilityChange = () => {
    isVisibleRef.current = !document.hidden;

    if (!isVisibleRef.current) {
      stopAllLoops();
    } else if (gameStartedRef.current && !gameOverRef.current) {
      // Resume loops
      startReleasingBubbles();
      startAnimation();
      startTimer();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);


  /* ------------------------------------------------------------ */
  return (
    <div ref={containerRef} className="game_window">
      {!gameStarted && !gameOver && (
        <div className="game_overlay">
          <div className="game_popup">
            <h2>Ready to pop? Don't let them get to the top!</h2>
            <button className="game_go" onClick={startGame}>
              GO
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="game_overlay">
          <div className="game_popup">
            <h2>Oh no, you lose 😢</h2>
            <p>You survived {timePlayed} seconds</p>
            {scoreMessage && <p><strong>{scoreMessage}</strong></p>}
            <button className="game_go" onClick={startGame}>
              Play again
            </button>
          </div>
        </div>
      )}

      <div className="game_bubble_layer">
        {bubbles.map(({ id, x, y, size, popped }) => (
          <span
            key={id}
            className={`game_bubble ${popped ? 'game_bubble_popped' : ''}`}
            style={{
              width: size,
              height: size,
              left: x,
              top: y,
            }}
            onMouseEnter={() => handlePop(id)}
            onTouchStart={() => handlePop(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleGame;
