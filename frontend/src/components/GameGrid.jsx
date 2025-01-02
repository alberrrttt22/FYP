import React, { useState, useEffect } from 'react';

const GameGrid = ({ timeLeft }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Initialize cards with images
    const images = [
      '../public/images/img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png',
    ];
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));

    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    // Check for game over when time runs out or all matches are found
    if (timeLeft <= 0 || matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [timeLeft, matchedCards, cards]);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || matchedCards.includes(id) || flippedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].img === cards[second].img) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
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
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(index)}
          className={`bg-white border rounded-lg flex items-center justify-center p-4 shadow ${
            flippedCards.includes(index) || matchedCards.includes(index)
              ? 'bg-gray-200'
              : ''
          }`}
        >
          {(flippedCards.includes(index) || matchedCards.includes(index)) && (
            <img
              src={`/images/${card.img}`}
              alt={`Card ${card.img}`}
              className="w-12 h-12"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;