import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';


const GameGrid = ({ timeLeft, gameOver, setGameOver, setTimeLeft }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // Initialize cards with images
    const images = [
      'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png',
    ];
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));

    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (gameOver && ((matchedCards.length === cards.length) && matchedCards.length!=0)) {
      triggerConfetti(); // Show confetti when the game is won
    }
  }, [gameOver, matchedCards]);

  useEffect(() => {
    // Check for game over when time runs out or all matches are found
    if (timeLeft <= 0 || ((matchedCards.length === cards.length) && matchedCards.length!=0)) {
      setGameOver(true);
    }
  }, [timeLeft, matchedCards, cards]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 400,
      spread: 90,
      origin: { x: 0.6, y: 0.6 }, // Adjust origin point for better visual effect
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
      }
      setTimeout(() => setFlippedCards([]), 350);
    }
  };

  const playFlipSound = () => {
    const flipSound = new Audio('/sounds/flipcard.mp3');
    flipSound.play();
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
  };

  return gameOver ? (
    <div className="text-center">
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
        onClick={() => handleCardClick(index)}
        className={`bg-white border hover:bg-gray-300 rounded-lg flex items-center justify-center shadow ${
          flippedCards.includes(index) || matchedCards.includes(index) ? 'bg-gray-200' : ''
        }`}
        style={{ width: '100px', height: '100px' }} // Set block size here
        >
        {(flippedCards.includes(index) || matchedCards.includes(index)) && (
          <img
            src={`/images/${card.img}`}
            alt={`Card ${card.img}`}
            style={{
              width: '100%',   // Ensure the image takes up the full block width
              height: '100%',  // Ensure the image takes up the full block height
              objectFit: 'cover', // Crop/resize the image to fit within the block
            }}
          />
        )}
      </div>
      ))}
    </div>
    </div>
  );
};

export default GameGrid;