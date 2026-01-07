import React from 'react';
import Header from '../components/Header';
import BubbleGame from '../components/BubbleGame';
import './bubbles.css';
import './styles.css';

const Bubbles = () => {
  return (
    <div className="full_page">
      <Header />
      <div className="bubbles_content">
        <h1 className="bubbles_title">Don't let the bubbles touch the top!</h1>
        <div className="bubbles_game_wrapper">
          <BubbleGame bubbleCount={20} width="900px" height="500px" />
        </div>
      </div>
    </div>
  );
};

export default Bubbles;
