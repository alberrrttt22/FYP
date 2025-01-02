import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-blue-500 h-screen p-4">
      <nav className="flex flex-col gap-2">
        <button className="text-left hover:bg-blue-600 p-2 rounded">Game Modes</button>
        <button className="text-left hover:bg-blue-600 p-2 rounded">Dashboard</button>
        <button className="text-left hover:bg-blue-600 p-2 rounded">Flashcard Mode</button>
        <button className="text-left hover:bg-blue-600 p-2 rounded">Settings</button>
        <button className="text-left hover:bg-blue-600 p-2 rounded">Sign Out</button>
      </nav>
    </div>
  );
};

export default Sidebar;