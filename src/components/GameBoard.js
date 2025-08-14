"use client";

export default function GameBoard({ guesses, wordLength }) {
  return (
    <div className="grid gap-2">
      {guesses.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`w-12 h-12 flex items-center justify-center text-xl font-bold border 
              ${cell.status === "correct" ? "bg-green-500 text-white" : 
                cell.status === "present" ? "bg-yellow-500 text-white" : 
                cell.status === "absent" ? "bg-gray-500 text-white" : "bg-white"}`}
            >
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
