"use client";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterTracker({ letterStatus }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {alphabet.map((letter, idx) => {
        let bg = "bg-gray-800 border border-gray-600";
        if (letterStatus?.[letter] === "correct") bg = "bg-green-500";
        if (letterStatus?.[letter] === "present") bg = "bg-yellow-500";
        if (letterStatus?.[letter] === "absent") bg = "bg-gray-600";

        return (
          <div
            key={idx}
            className={`${bg} w-12 h-12 flex items-center justify-center text-lg font-bold`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
