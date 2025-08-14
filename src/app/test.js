"use client";

import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";

export default function Home() {
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    fetch("/api/get-word")
      .then(res => res.json())
      .then(data => {
        setWordLength(data.wordLength);
        setGuesses(
          Array(6).fill().map(() =>
            Array(data.wordLength).fill({ letter: "", status: "" })
          )
        );
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
            newGuesses[currentRow] = data.result; // set colors & letters
            setGuesses(newGuesses);
            setCurrentGuess("");
            if (data.isCorrect) {
              alert("🎉 You guessed it!");
              setGameOver(true);
            } else if (currentRow === guesses.length - 1) {
              alert("❌ Game Over! The word was APPLE");
              setGameOver(true);
            }
            setCurrentRow(currentRow + 1);
          });
      }
      return;
    }

    if (key === "BACKSPACE") {
      const updatedGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedGuess);

      const newGuesses = [...guesses];
      newGuesses[currentRow][updatedGuess.length] = { letter: "", status: "" };
      setGuesses(newGuesses);
      return;
    }

    if (currentGuess.length < wordLength && /^[A-Z]$/.test(key)) {
      const updatedGuess = currentGuess + key;
      setCurrentGuess(updatedGuess);

      const newGuesses = [...guesses];
      newGuesses[currentRow][updatedGuess.length - 1] = { letter: key, status: "" };
      setGuesses(newGuesses);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Word Game</h1>
      <GameBoard guesses={guesses} wordLength={wordLength} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}
