import React from 'react';

const RepDisplay = ({ reps, totalReps }) => {
  return (
    <div className="text-center mt-1">
      <p className="text-lg font-semibold">{totalReps - reps}/{totalReps} Remaining</p>
      <p className="text-lg font-semibold text-red-500"></p>
    </div>
  );
};

export default RepDisplay;