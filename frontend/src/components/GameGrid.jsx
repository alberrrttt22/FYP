import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GameGrid = ({ timeLeft, gameOver, setGameOver, setTimeLeft }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [points, setPoints] = useState(0);
  const [floatingPoint, setFloatingPoint] = useState({ visible: false, position: { x: 0, y: 0 } });

  useEffect(() => {
    const images = [
      'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png',
    ];
    const shuffledCards = [...images, ...images]
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
        setMatchedCards([...matchedCards, first, second]);
        playCorrectSound();
        setPoints(points + 1);
        showFloatingPoint(second); // Trigger the floating point animation
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

  const resetGame = () => {
    const images = [
      'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png',
    ];
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));

    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
    setTimeLeft(60);
    setPoints(0);
  };

  return gameOver ? (
    <div className="text-center">
      <p>Points: {points} + {timeLeft} (Time left) = {points + timeLeft}</p>
      <br></br>
      <h2 className="text-2xl font-bold">
        {matchedCards.length === cards.length ? 'You Win!' : 'Game Over'}
      </h2>
      <button
        onClick={resetGame}
        className="bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600"
      >
        Play Again
      </button>
    </div>
  ) : (
    <div>
      <div className = "text-center">
      <p>Points: {points}</p>
      </div>
      <button
        onClick={resetGame}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Restart Game
      </button>
      <div className="grid grid-cols-4 gap-4">
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
                src={`/images/${card.img}`}
                alt={`Card ${card.img}`}
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
          className="absolute transform -translate-x-1/2 text-green-500 font-bold text-xl animate-floatUp"
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

export default GameGrid;