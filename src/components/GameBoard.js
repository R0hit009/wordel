"use client";

import { useEffect, useState } from "react";
import LetterTracker from "./LetterTracker";

export default function GameBoard({ maxRows = 6 }) {
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Track letter status globally
  const [letterStatus, setLetterStatus] = useState({});

  // Load target word length
  useEffect(() => {
    fetch("/api/get-word")
      .then(res => res.json())
      .then(data => {
        setWordLength(data.wordLength);
        setGuesses(
          Array(maxRows).fill().map(() =>
            Array(data.wordLength).fill({ letter: "", status: "" })
          )
        );
      });
  }, [maxRows]);

  // Key handling
  const handleKeyDown = (e) => {
    if (gameOver) return;

    if (e.key === "Enter") {
      if (currentGuess.length === wordLength) {
        fetch("/api/check-guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guess: currentGuess }),
        })
          .then(res => res.json())
          .then(data => {
            const newGuesses = [...guesses];
            newGuesses[currentRow] = data.result;
            setGuesses(newGuesses);

            // update letter tracker
            const updatedStatus = { ...letterStatus };
            data.result.forEach(({ letter, status }) => {
              // priority: correct > present > absent
              if (status === "correct") updatedStatus[letter] = "correct";
              else if (status === "present" && updatedStatus[letter] !== "correct")
                updatedStatus[letter] = "present";
              else if (!updatedStatus[letter])
                updatedStatus[letter] = "absent";
            });
            setLetterStatus(updatedStatus);

            if (data.isCorrect) {
              setGameOver(true);
              return;
            }
            if (currentRow === guesses.length - 1) {
              setGameOver(true);
              return;
            }

            setCurrentRow(currentRow + 1);
            setCurrentGuess("");
          });
      }
    } else if (e.key === "Backspace") {
      const updatedGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedGuess);

      const newGuesses = [...guesses];
      newGuesses[currentRow][updatedGuess.length] = { letter: "", status: "" };
      setGuesses(newGuesses);
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < wordLength) {
      const updatedGuess = currentGuess + e.key.toUpperCase();
      setCurrentGuess(updatedGuess);

      const newGuesses = [...guesses];
      newGuesses[currentRow][updatedGuess.length - 1] = { letter: e.key.toUpperCase(), status: "" };
      setGuesses(newGuesses);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex gap-10">
      {/* Wordle Board */}
      <div className="flex flex-col items-center">
        <div className="grid gap-2">
          {guesses.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((cell, cellIndex) => {
                let bg = "bg-gray-800 border border-gray-600";
                if (cell.status === "correct") bg = "bg-green-500";
                if (cell.status === "present") bg = "bg-yellow-500";
                if (cell.status === "absent") bg = "bg-gray-600";

                return (
                  <div
                    key={cellIndex}
                    className={`${bg} w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase`}
                  >
                    {cell.letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
          
      {/* Letter Tracker on right */}
      <LetterTracker letterStatus={letterStatus} />
    </div>
  );
}
