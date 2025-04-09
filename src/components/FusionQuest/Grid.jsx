import React from 'react';
import IconDNB from './IconDNB';

const Grid = ({ position, icon, isVisible }) => {
  const renderCell = (index) => {
    const isActive = index === position;
    return (
      <div
        key={index}
        className="w-20 h-20 border border-blue-400 flex items-center justify-center bg-white"
      >
        {isActive && isVisible && <IconDNB icon={icon} />}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-300 rounded-md shadow-lg">
      {[...Array(9)].map((_, index) => renderCell(index))}
    </div>
  );
};

export default Grid;
