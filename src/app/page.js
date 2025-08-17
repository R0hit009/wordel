"use client";
import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import RestartButton from "@/components/RestartButton";
import LetterTracker from "@/components/LetterTracker"; // 👈 add this

export default function HomePage() {
  const [gameKey, setGameKey] = useState(0);
  const [level, setLevel] = useState("medium");
  const [discoveredLetters, setDiscoveredLetters] = useState(new Set());

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setDiscoveredLetters(new Set()); // reset letters
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setGameKey(prev => prev + 1);
    setDiscoveredLetters(new Set());
  };

  return (
    <main className="min-h-screen flex flex-row justify-center items-start gap-8 p-6 ">
      {/* LEFT SIDE → Game */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Wordle Game</h1>

        {/* Level Selector */}
        <div className="flex gap-4">
          {["easy", "medium", "hard"].map(l => (
            <button
              key={l}
              onClick={() => handleLevelChange(l)}
              className={`px-4 py-2 rounded ${
                level === l ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>

        {/* Game Board */}
         <GameBoard key={gameKey} level={level} />

        {/* Restart Button */}
        <RestartButton onRestart={handleRestart} />
      </div>

      {/* RIGHT SIDE → Letter Tracker */}
    </main>
  );
}
