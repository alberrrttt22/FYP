import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { visualQuestImages } from './VisualQuestAssets';


const VQMultiplayer = ({ gameOver, setGameOver, gameStarted, setGameStarted }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [floatingPoint, setFloatingPoint] = useState({ visible: false, position: { x: 0, y: 0 } });
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);


  const getRandomImages = (gridAmt) => {
    const imagesCopy = [...visualQuestImages];
    const gridAmt = {
      1: 15,
      2: 19,
      3: 21
    };
    
    const count = levelImageCount[gridAmt];
  
    const selected = [];
  
    for (let i = 0; i < count; i++) {
      const randIndex = Math.floor(Math.random() * imagesCopy.length);
      selected.push(imagesCopy[randIndex]);
      imagesCopy.splice(randIndex, 1); // Ensure no duplicates
    }
  
    return selected;
  };
  
  
  useEffect(() => {
    const selectedImages = getRandomImages(2);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (gameOver && matchedCards.length === cards.length && matchedCards.length !== 0) {
      triggerConfetti();
    }
  }, [gameOver, matchedCards]);


  useEffect(() => {
    if (timeLeft <= 0 || (matchedCards.length === cards.length && matchedCards.length !== 0)) {
      setGameOver(true);
    }
  }, [timeLeft, matchedCards, cards]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 400,
      spread: 90,
      origin: { x: 0.6, y: 0.6 },
    });
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || matchedCards.includes(id) || flippedCards.includes(id)) return;
    playFlipSound();

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].img === cards[second].img) {
        if (currentTurn === 1){
            setMatchedCards([...matchedCards, first, second]);
            playCorrectSound();
            setPlayer1Score((prev) => prev + 1);
            showFloatingPoint(second); 
        }
        else if (currentTurn === 2){
            setMatchedCards([...matchedCards, first, second]);
            playCorrectSound();
            setPlayer2Score((prev) => prev + 1);
            showFloatingPoint(second);
        }
      }
      setTimeout(() => setFlippedCards([]), 350);
    }
  };

  const playFlipSound = () => {
    const flipSound = new Audio('/sounds/flipcard.mp3');
    flipSound.play();
  };

  const playCorrectSound = () => {
    const correctSound = new Audio('/sounds/correct-flip.mp3');
    correctSound.play();
  };

  const showFloatingPoint = (cardIndex) => {
    const cardElement = document.querySelector(`[data-id="${cardIndex}"]`);
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setFloatingPoint({
        visible: true,
        position: { x: rect.left + rect.width / 2, y: rect.top }
      });
      setTimeout(() => setFloatingPoint({ visible: false, position: { x: 0, y: 0 } }), 1000);
    }
  };

  const resetGame = (level) => {
    const selectedImages = getRandomImages(2);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));
  
    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
    setTimeLeft(60);
    setPoints(0);
    setDifficulty(level);
  };
  

  return gameOver ? (
    <div className="vg-header text-center">
      <p>Points: {points} + {timeLeft} (Time left) = {points + timeLeft}</p>
      <br></br>
      <h2 className="text-white text-2xl font-bold">
        {matchedCards.length === cards.length ? 'You Win! Play again?' : 'Game Over! Play again?'}
      </h2>
      <br></br>
      <div className="flex flex-row justify-center items-center gap-4">
            <button
              onClick={() => resetGame(1)}
              className="bg-green-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Easy
            </button>
            <button
              onClick={() => resetGame(2)}
              className="bg-yellow-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Medium
            </button>
            <button
              onClick={() => resetGame(3)}
              className="bg-red-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Hard
            </button>
          </div>
    </div>
  ) : (
    <div>
      <div className = "text-center">
      
      <p className="vg-header">Points: {points}</p>
      </div>
      <button
        onClick={() => resetGame()}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Restart Game
      </button>
      <div
  className={`grid gap-4`}
  style={{
    gridTemplateColumns: `repeat(${Math.ceil(cards.length / 3)}, 1fr)`, // Ensure 3 rows
  }}
>
        {cards.map((card, index) => (
          <div
            key={index}
            data-id={index}
            onClick={() => handleCardClick(index)}
            className={`bg-white border hover:bg-gray-300 rounded-lg flex items-center justify-center shadow ${
              flippedCards.includes(index) || matchedCards.includes(index) ? 'bg-gray-200' : ''
            }`}
            style={{ width: '100px', height: '100px' }}
          >
            {(flippedCards.includes(index) || matchedCards.includes(index)) && (
              <img
                src={`${card.img}`}
                alt={`${card.img}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
      </div>
      {floatingPoint.visible && (
        <div
          className="absolute transform -translate-x-1/2 text-green-500 font-bold animate-floatUp text-3xl"
          style={{
            left: floatingPoint.position.x,
            top: floatingPoint.position.y,
          }}
        >
          +1
        </div>
      )}
    </div>
  );
};

export default VQMultiplayer;