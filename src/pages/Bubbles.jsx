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
        <div className="bubbles_game_wrapper">
         <BubbleGame/>
        </div>
      </div>
    </div>
  );
};

export default Bubbles;
