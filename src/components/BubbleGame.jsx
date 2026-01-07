import React, { useState, useEffect, useRef } from 'react';
import './bubbleGame.css';

const LAST_SCORE_KEY = 'bubbleGame_lastScore';
const BEST_SCORE_KEY = 'bubbleGame_bestScore';

const BubbleGame = ({ width = 420, height = 300 }) => {
  const [bubbles, setBubbles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [scoreMessage, setScoreMessage] = useState('');
  const [finalScore, setFinalScore] = useState(0); 

  const animationRef = useRef(null);
  const releaseTimeoutRef = useRef(null);
  const bubbleIncrementIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const isVisibleRef = useRef(!document.hidden);
  const gameStartedRef = useRef(false);
  const timePlayedRef = useRef(0);

  const globalSpeedRef = useRef(0.2);
  const bubblesPerReleaseRef = useRef(1);

  const stopAllLoops = () => {
    clearTimeout(releaseTimeoutRef.current);
    clearInterval(bubbleIncrementIntervalRef.current);
    clearInterval(timerIntervalRef.current);
    cancelAnimationFrame(animationRef.current);
  };

  // Create bubble -----------------------------------------------------------------------
  const createBubble = () => {
    globalSpeedRef.current += 0.03;
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 60),
      y: -60,
      size: 40 + Math.random() * 40,
      speed: globalSpeedRef.current,
      popped: false,
    };
  };

  // Pop bubble ------------------------------------------------------------
  const handlePop = (id) => {
    if (!gameStartedRef.current) return;

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  // Release bubbles ------------------------------------------------------------
  const startReleasingBubbles = () => {
    let delay = 700;

    const releaseBubble = () => {
      if (!isVisibleRef.current || !gameStartedRef.current) return;

      setBubbles((prev) => [
        ...prev,
        ...Array.from({ length: bubblesPerReleaseRef.current }, createBubble),
      ]);

      delay += 1;
      releaseTimeoutRef.current = setTimeout(releaseBubble, delay);
    };

    releaseBubble();

    bubbleIncrementIntervalRef.current = setInterval(() => {
      bubblesPerReleaseRef.current += 1;
    }, 10000);
  };

  // Animation + lose detection ----------------------------------------------------------
  const startAnimation = () => {
    const animate = () => {
      if (isVisibleRef.current && gameStartedRef.current) {
        setBubbles((prev) => {
          for (const b of prev) {
            if (!b.popped && b.y + b.size >= height) {
              triggerGameOver();
              return prev;
            }
          }

          return prev.map((b) =>
            b.popped ? b : { ...b, y: b.y + b.speed }
          );
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Timer ------------------------------------------------------------
  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      timePlayedRef.current += 1;
      setTimePlayed(timePlayedRef.current);
    }, 1000);
  };

  // Game over  ------------------------------------------------------------
  const triggerGameOver = () => {
    gameStartedRef.current = false;
    setGameStarted(false);
    setGameOver(true);
    stopAllLoops();

    const finalTime = timePlayedRef.current;
    setFinalScore(finalTime);

    const lastScore = Number(localStorage.getItem(LAST_SCORE_KEY)) || 0;
    const bestScore = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;

    let message = '';

    if (finalTime > bestScore) {
      message = `Wow! ${finalTime} seconds! New best score! 🎉`;
    } else if (finalTime > lastScore) {
      message = `Good job! ${finalTime - lastScore} seconds longer than last time 👏`;
    }

    setScoreMessage(message);
  };

  // Start  game  ------------------------------------------------------------
  const startGame = () => {
    // If restarting after a game, store previous scores
    if (gameOver) {
      if (finalScore > 0) {
        localStorage.setItem(LAST_SCORE_KEY, finalScore);

        const bestScore = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
        if (finalScore > bestScore) {
          localStorage.setItem(BEST_SCORE_KEY, finalScore);
        }
      }
    }

    stopAllLoops();

    timePlayedRef.current = 0;
    setTimePlayed(0);
    setBubbles([]);
    setGameOver(false);
    setScoreMessage('');
    setFinalScore(0);
    setGameStarted(true);
    gameStartedRef.current = true;

    globalSpeedRef.current = 0.2;
    bubblesPerReleaseRef.current = 1;

    startReleasingBubbles();
    startAnimation();
    startTimer();
  };

  // Pause when not on the page ------------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;

      if (!isVisibleRef.current) {
        clearTimeout(releaseTimeoutRef.current);
        clearInterval(bubbleIncrementIntervalRef.current);
        clearInterval(timerIntervalRef.current);
      } else if (gameStartedRef.current) {
        startReleasingBubbles();
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);


  return (
    <div
      className="game_window"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Start popup */}
      {!gameStarted && !gameOver && (
        <div className="game_overlay">
          <div className="game_popup">
            <h2>
              Ready to pop?
            </h2>
            <button className="game_go" onClick={startGame}>GO</button>
          </div>
        </div>
      )}

      {/* Game over popup */}
      {gameOver && (
        <div className="game_overlay">
          <div className="game_popup">
            <h2>Oh no, you lose 😢</h2>
            <p>You survived {timePlayed} seconds</p>
            {scoreMessage && <p><strong>{scoreMessage}</strong></p>}
            <button className='game_go' onClick={startGame}>Play again</button>
          </div>
        </div>
      )}

      {/* Bubble layer */}
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
