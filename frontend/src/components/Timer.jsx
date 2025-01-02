import React, { useEffect } from 'react';

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]);

  return (
    <div className="text-center mb-4">
      <h2>Time Left: {timeLeft}s</h2>
    </div>
  );
};

export default Timer;