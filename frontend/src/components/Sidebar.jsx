import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-blue-500 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <Link to="/game-modes" className="text-left hover:bg-blue-600 p-2 rounded">Game Modes</Link>
        <Link to="/dashboard" className="text-left hover:bg-blue-600 p-2 rounded">Dashboard</Link>
        <Link to="/flashcard-mode" className="text-left hover:bg-blue-600 p-2 rounded">Flashcard Mode</Link>
        <Link to="/settings" className="text-left hover:bg-blue-600 p-2 rounded">Settings</Link>
        <Link to="/sign-out" className="text-left hover:bg-blue-600 p-2 rounded">Sign Out</Link>
      </nav>
    </div>
  );
};

export default Sidebar;