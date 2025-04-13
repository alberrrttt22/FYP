import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { visualQuestImages } from './VisualQuestAssets';
import { saveScore } from "../../firestoreHelpers"; 
import { useAuth } from "../../context/AuthContext";


const VisualQuestGrid = ({ timeLeft, gameOver, setGameOver, setTimeLeft, difficulty, setDifficulty, gameStarted, setGameStarted }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [points, setPoints] = useState(0);
  const [floatingPoint, setFloatingPoint] = useState({ visible: false, position: { x: 0, y: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth();
  
  const flipSound = new Audio('/sounds/flipcard.mp3');
  const correctSound = new Audio('/sounds/correct-flip.mp3');

  const playFlipSound = () => {
    flipSound.currentTime = 0;
    flipSound.play();
  };

  const playCorrectSound = () => {
    correctSound.currentTime = 0;
    correctSound.play();
  };


  const totalPoints = points + timeLeft
  const getRandomImages = (difficulty) => {
    const imagesCopy = [...visualQuestImages];
    const levelImageCount = {
      1: 6,
      2: 9,
      3: 12
    };
    
    const count = levelImageCount[difficulty] || 6;
  
    const selected = [];
    console.log("Selected images:", selected);
  
    for (let i = 0; i < count; i++) {
      const randIndex = Math.floor(Math.random() * imagesCopy.length);
      selected.push(imagesCopy[randIndex]);
      imagesCopy.splice(randIndex, 1); // Ensure no duplicates
    }
  
    return selected;
  };

  


  useEffect(() => {
    let difficultyWord = "";
    if (difficulty === 1){
      difficultyWord = "Easy";
    }
    else if (difficulty === 2){
      difficultyWord = "Medium";
    }
    else if (difficulty === 3){
      difficultyWord = "Tough";
    }
    if (gameOver && user) {
      saveScore(user.uid, "VisualQuest", difficultyWord , totalPoints);
    }
  }, [gameOver, user, totalPoints]);


  const preloadImages = (imageArray) => {
    return Promise.all(
      imageArray.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();   
          img.src = src;             
          img.onload = resolve;      
        });
      })
    );
  };
  
  useEffect(() => {
    const selectedImages = getRandomImages(difficulty);
    setIsLoading(true);
    preloadImages(selectedImages).then(() => {
      const shuffledCards = [...selectedImages, ...selectedImages]
        .sort(() => Math.random() - 0.5)
        .map((img, index) => ({ id: index, img, flipped: false }));
      setCards(shuffledCards);
      setIsLoading(false);
    });
  }, [difficulty]);

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
    const selectedImages = getRandomImages(level);
  setIsLoading(true);
  preloadImages(selectedImages).then(() => {
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));

    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
    setPoints(0);
    setDifficulty(level);

    if (level === 1) {
      setTimeLeft(30);
    } else if (level === 2) {
      setTimeLeft(40);
    } else {
      setTimeLeft(50);
    }

    setIsLoading(false);
  });
  };

  if (isLoading) {
    return <div className="text-center text-2xl mt-10">Loading cards...</div>;
  }

  return gameOver ? (
    <div className="vg-header text-center bg-white p-8 rounded-2xl shadow-lg bg-opacity-80">
      <p className="text-xl text-black">Points: {points} + {timeLeft} (Time left) = {points + timeLeft}</p>
      <br></br>
      <h2 className="text-white text-2xl text-black">
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
              Tough
            </button>
          </div>
    </div>
  ) : (
    <div>
      <div className = "text-center">
      
      <p className="vg-header mb-5 text-2xl">Points: {points}</p>
      </div>
      <button
        onClick={() => resetGame(difficulty)}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Restart Game
      </button>
      <div className="absolute top-11 right-0 m-4">
          <select
            value={difficulty}
            onChange={(e) => resetGame(parseInt(e.target.value))}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
      </div>
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

export default VisualQuestGrid;