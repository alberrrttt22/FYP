import React, { useEffect } from 'react';

const Timer = ({ timeLeft, setTimeLeft, totalTime, gameOver, gameStarted }) => {
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft, gameOver, gameStarted]);

  // Calculate the width percentage of the timer bar
  const barWidth = (timeLeft / totalTime) * 100;

  return (
    <div className="text-center mb-4">
      <h2 className="text-lg font-semibold text-white">Time Left: {timeLeft}s</h2>
      <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-teal-500 transition-all duration-1000 ease-linear"
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;