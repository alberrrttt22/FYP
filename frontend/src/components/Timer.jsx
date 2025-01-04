import React, { useEffect } from 'react';

const Timer = ({ timeLeft, setTimeLeft, gameOver}) => {
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft, gameOver]);

  return (
    <div className="text-center mb-4">
      <h2>Time Left: {timeLeft}s</h2>
    </div>
  );
};

export default Timer;