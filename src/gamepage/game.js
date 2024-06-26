import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './game.css';

import { ReactComponent as Card2C } from './../cardsvg/2C.svg';
import { ReactComponent as Card2D } from './../cardsvg/2D.svg';
import { ReactComponent as Card2H } from './../cardsvg/2H.svg';
import { ReactComponent as Card2S } from './../cardsvg/2S.svg';
import { ReactComponent as Card3C } from './../cardsvg/3C.svg';
import { ReactComponent as Card3D } from './../cardsvg/3D.svg';
import { ReactComponent as Card3H } from './../cardsvg/3H.svg';
import { ReactComponent as Card3S } from './../cardsvg/3S.svg';
import { ReactComponent as Card4C } from './../cardsvg/4C.svg';
import { ReactComponent as Card4D } from './../cardsvg/4D.svg';
import { ReactComponent as Card4H } from './../cardsvg/4H.svg';
import { ReactComponent as Card4S } from './../cardsvg/4S.svg';
import { ReactComponent as Card5C } from './../cardsvg/5C.svg';
import { ReactComponent as Card5D } from './../cardsvg/5D.svg';
import { ReactComponent as Card5H } from './../cardsvg/5H.svg';
import { ReactComponent as Card5S } from './../cardsvg/5S.svg';
import { ReactComponent as Card6C } from './../cardsvg/6C.svg';
import { ReactComponent as Card6D } from './../cardsvg/6D.svg';
import { ReactComponent as Card6H } from './../cardsvg/6H.svg';
import { ReactComponent as Card6S } from './../cardsvg/6S.svg';
import { ReactComponent as Card7C } from './../cardsvg/7C.svg';
import { ReactComponent as Card7D } from './../cardsvg/7D.svg';
import { ReactComponent as Card7H } from './../cardsvg/7H.svg';
import { ReactComponent as Card7S } from './../cardsvg/7S.svg';
import { ReactComponent as Card8C } from './../cardsvg/8C.svg';
import { ReactComponent as Card8D } from './../cardsvg/8D.svg';
import { ReactComponent as Card8H } from './../cardsvg/8H.svg';
import { ReactComponent as Card8S } from './../cardsvg/8S.svg';
import { ReactComponent as Card9C } from './../cardsvg/9C.svg';
import { ReactComponent as Card9D } from './../cardsvg/9D.svg';
import { ReactComponent as Card9H } from './../cardsvg/9H.svg';
import { ReactComponent as Card9S } from './../cardsvg/9S.svg';
import { ReactComponent as CardAC } from './../cardsvg/AC.svg';
import { ReactComponent as CardAD } from './../cardsvg/AD.svg';
import { ReactComponent as CardAH } from './../cardsvg/AH.svg';
import { ReactComponent as CardAS } from './../cardsvg/AS.svg';
import { ReactComponent as CardJC } from './../cardsvg/JC.svg';
import { ReactComponent as CardJD } from './../cardsvg/JD.svg';
import { ReactComponent as CardJH } from './../cardsvg/JH.svg';
import { ReactComponent as CardJS } from './../cardsvg/JS.svg';
import { ReactComponent as CardKC } from './../cardsvg/KC.svg';
import { ReactComponent as CardKD } from './../cardsvg/KD.svg';
import { ReactComponent as CardKH } from './../cardsvg/KH.svg';
import { ReactComponent as CardKS } from './../cardsvg/KS.svg';
import { ReactComponent as CardQC } from './../cardsvg/QC.svg';
import { ReactComponent as CardQD } from './../cardsvg/QD.svg';
import { ReactComponent as CardQH } from './../cardsvg/QH.svg';
import { ReactComponent as CardQS } from './../cardsvg/QS.svg';
import { ReactComponent as CardTC } from './../cardsvg/TC.svg';
import { ReactComponent as CardTD } from './../cardsvg/TD.svg';
import { ReactComponent as CardTH } from './../cardsvg/TH.svg';
import { ReactComponent as CardTS } from './../cardsvg/TS.svg';


const cardComponents = [
    { name: '2C', component: Card2C },
    { name: '2D', component: Card2D },
    { name: '2H', component: Card2H },
    { name: '2S', component: Card2S },
    { name: '3C', component: Card3C },
    { name: '3D', component: Card3D },
    { name: '3H', component: Card3H },
    { name: '3S', component: Card3S },
    { name: '4C', component: Card4C },
    { name: '4D', component: Card4D },
    { name: '4H', component: Card4H },
    { name: '4S', component: Card4S },
    { name: '5C', component: Card5C },
    { name: '5D', component: Card5D },
    { name: '5H', component: Card5H },
    { name: '5S', component: Card5S },
    { name: '6C', component: Card6C },
    { name: '6D', component: Card6D },
    { name: '6H', component: Card6H },
    { name: '6S', component: Card6S },
    { name: '7C', component: Card7C },
    { name: '7D', component: Card7D },
    { name: '7H', component: Card7H },
    { name: '7S', component: Card7S },
    { name: '8C', component: Card8C },
    { name: '8D', component: Card8D },
    { name: '8H', component: Card8H },
    { name: '8S', component: Card8S },
    { name: '9C', component: Card9C },
    { name: '9D', component: Card9D },
    { name: '9H', component: Card9H },
    { name: '9S', component: Card9S },
    { name: 'AC', component: CardAC },
    { name: 'AD', component: CardAD },
    { name: 'AH', component: CardAH },
    { name: 'AS', component: CardAS },
    { name: 'JC', component: CardJC },
    { name: 'JD', component: CardJD },
    { name: 'JH', component: CardJH },
    { name: 'JS', component: CardJS },
    { name: 'KC', component: CardKC },
    { name: 'KD', component: CardKD },
    { name: 'KH', component: CardKH },
    { name: 'KS', component: CardKS },
    { name: 'QC', component: CardQC },
    { name: 'QD', component: CardQD },
    { name: 'QH', component: CardQH },
    { name: 'QS', component: CardQS },
    { name: 'TC', component: CardTC },
    { name: 'TD', component: CardTD },
    { name: 'TH', component: CardTH },
    { name: 'TS', component: CardTS },
];

// Import card components here

const socket = io('http://localhost:5000');



const SlidingPane = ({ items, onItemClick, onTogglePane, selectedIndices }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomIndices, setRandomIndices] = useState([]);

  const togglePane = () => {
    setIsOpen(!isOpen);
    if (onTogglePane) {
      onTogglePane(!isOpen);
    }
  };

  useEffect(() => {
    const generateRandomIndices = (totalItems, count) => {
      const indices = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * totalItems);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };

    setRandomIndices(generateRandomIndices(items.length, 17));
  }, [items.length]);

  return (
    <div className={`pane-container ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={togglePane}>
        {isOpen ? 'Close Pane' : 'Open Pane'}
      </button>
      <div className="pane">
        <h2>Items</h2>
        <div className="items-container">
          {items.map((item, index) => (
            randomIndices.includes(index) && !selectedIndices.includes(index) && (
              <div
                key={index}
                className="item"
                onClick={() => {
                  onItemClick(index);
                  togglePane();
                }}
              >
                <item.component />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [isGameFull, setIsGameFull] = useState(false);
  const [result, setResult] = useState(null);
// JavaScript to handle mouse movement and card animation
document.addEventListener('mousemove', (event) => {
  const card = document.createElement('div');
  card.className = 'cardm';
  card.style.left = `${event.pageX - 50}px`; // Center the card on the cursor
  card.style.top = `${event.pageY - 75}px`;
  
  document.querySelector('.Ap').appendChild(card);

  // Trigger the disappear animation after a short delay
  setTimeout(() => {
      card.style.animation = 'disappear 0.5s ease forwards';
  }, 500); // Adjust the delay as needed

  // Remove the card from the DOM after the disappear animation completes
  card.addEventListener('animationend', () => {
      card.remove();
  });
});

  useEffect(() => {
    socket.on('update-players', (players) => {
      setPlayers(players);
    });

    socket.on('start-game', () => {
      alert('Game is starting!');
    });

    socket.on('game-full', () => {
      setIsGameFull(true);
    });

    socket.on('game-result', ({ winnerId }) => {
      setResult(winnerId === 'draw' ? 'It\'s a draw!' : `The winner is ${winnerId}`);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    });

    return () => {
      socket.off('update-players');
      socket.off('start-game');
      socket.off('game-full');
      socket.off('game-result');
    };
  }, []);

  const handleItemClick = (index) => {
    if (selectedIndices.length < 1 && !selectedIndices.includes(index)) {
      setSelectedIndices([index]);
      socket.emit('select-card', index);
    }
  };

  const handleJoinGame = () => {
    socket.emit('join-game', playerName);
  };

  return (
    <div className="Ap">
      <h1>Three-Handed Whist Game</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        disabled={isGameFull}
      />
      <button onClick={handleJoinGame} disabled={isGameFull}>Join Game</button>
      {isGameFull && <p>The game is full. Please wait for the next game.</p>}
      <div className="player-cards">
        {players.map((player, idx) => (
          <div key={player.id} className="player-card">
            <p>{player.name}</p>
            {player.selectedCard !== null && React.createElement(cardComponents[player.selectedCard].component)}
          </div>
        ))}
      </div>
      <SlidingPane
        items={cardComponents}
        onItemClick={handleItemClick}
        onTogglePane={() => {}}
        selectedIndices={selectedIndices}
      />
      {result && (
        <div className="result-box">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Game;