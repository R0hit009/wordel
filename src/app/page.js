"use client";

import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";

export default function Home() {
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("/api/get-word")
      .then(res => res.json())
      .then(data => {
        setWordLength(data.wordLength);
        setGuesses(Array(6).fill().map(() => Array(data.wordLength).fill({ letter: "", status: "" })));
      });
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (currentGuess.length === wordLength) {
        fetch("/api/check-guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guess: currentGuess }),
        })
          .then(res => res.json())
          .then(data => {
            const newGuesses = [...guesses];
            const rowIndex = newGuesses.findIndex(row => row[0].letter === "");
            newGuesses[rowIndex] = data.result;
            setGuesses(newGuesses);
            setCurrentGuess("");
            if (data.isCorrect) {
              alert("🎉 You guessed it!");
              setGameOver(true);
            }
          });
      }
      return;
    }

    if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (currentGuess.length < wordLength && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Word Game</h1>
      <GameBoard guesses={guesses} wordLength={wordLength} />
      <p className="mt-2">Guess: {currentGuess}</p>
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}
