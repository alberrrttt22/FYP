import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { visualQuestImages } from './VisualQuestAssets';
import '../../styles/VQMultiplayer.css'


const VQMultiplayer = ({ gameOver, setGameOver, gameStarted, setGameStarted }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [floatingPoint, setFloatingPoint] = useState({ visible: false, position: { x: 0, y: 0 } });

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [currentTurn, setCurrentTurn] = useState(1);

  const [gridSize, setGridSize] = useState(2);


  const resetGame = (gridSize) => {
    const selectedImages = getRandomImages(gridSize);
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img, flipped: false }));
  
    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
    setCurrentTurn(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGridSize(gridSize);
  };

  const getRandomImages = (size) => {
    const imagesCopy = [...visualQuestImages];
    const gridImages = {
      1: 15,
      2: 18,
      3: 21,
      4: 2
    };
    
    const count = gridImages[size];
  
    const selected = [];
  
    for (let i = 0; i < count; i++) {
      const randIndex = Math.floor(Math.random() * imagesCopy.length);
      selected.push(imagesCopy[randIndex]);
      imagesCopy.splice(randIndex, 1); // Ensure no duplicates
    }
    return selected;
  };
  
  
  useEffect(() => {
    const selectedImages = getRandomImages(gridSize);
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
    if (matchedCards.length === cards.length && matchedCards.length !== 0) {
      setGameOver(true);
    }
  },  [matchedCards, cards]);

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
      else{
        setTimeout( () => {
            if (currentTurn === 1){
                setCurrentTurn(2);
            }
            else if (currentTurn === 2){
                setCurrentTurn(1);
            }
        }, 350);
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
  

  return gameOver ? (
    <div className="vg-header text-center">
      <div className = "player1Score text-2xl"> Player 1 Score: {player1Score} </div>
      <br />
      <div className = "player2Score text-2xl"> Player 2 Score: {player2Score} </div>
      <br></br>
      {(player1Score > player2Score) ? 
        (
            <div className="p1turn text-3xl">
                Player 1 Wins!
            </div>
        ) : (
            <div className="p2turn text-3xl">
                Player 2 Wins!
            </div>
        )}
      <br />
      <h2 className="text-white text-2xl font-bold">
        Play again?
      </h2>
      <br></br>
      <div className="flex flex-row justify-center items-center gap-4">
            <button
              onClick={() => resetGame(1)}
              className="bg-green-500 text-white p-3 rounded hover:bg-green-600 mb-4 w-50 h-50 "
            >
              Small Grid
            </button>
            <button
              onClick={() => resetGame(2)}
              className="bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600 mb-4 w-50 h-50"
            >
              Medium Grid
            </button>
            <button
              onClick={() => resetGame(3)}
              className="bg-red-500 text-white p-3 rounded hover:bg-red-600 mb-4 w-50 h-50"
            >
              Large Grid
            </button>

          </div>
    </div>
  ) : (
    <div>
        <div className = "text-center">
      
            <p className=" text-2xl player1Score ">
                Player 1 Points: {player1Score}
            </p>

            <p className=" text-2xl mb-5 player2Score">
                Player 2 Points: {player2Score}
            </p>

            <p className= {`text-4xl mb-5 ${(currentTurn === 1) ? 'p1turn' : 'p2turn'}`}>
                Player {currentTurn}'s Turn
            </p>

        </div>

      <button
        onClick={() => resetGame()}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Restart Game
      </button>
      <div className="absolute top-11 right-0 m-4">
          <select
            value={gridSize}
            onChange={(e) => resetGame(parseInt(e.target.value))}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <option value="1">Small Grid</option>
            <option value="2">Medium Grid</option>
            <option value="3">Large Grid</option>
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

export default VQMultiplayer;