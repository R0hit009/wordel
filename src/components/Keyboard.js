"use client";

const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function Keyboard({ onKeyPress }) {
  return (
    <div className="mt-4">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.split("").map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="bg-gray-300 p-2 m-1 rounded font-bold w-10"
            >
              {key}
            </button>
          ))}
          {i === 2 && (
            <button
              onClick={() => onKeyPress("ENTER")}
              className="bg-green-400 p-2 m-1 rounded font-bold"
            >
              ENTER
            </button>
          )}
          {i === 2 && (
            <button
              onClick={() => onKeyPress("BACKSPACE")}
              className="bg-red-400 p-2 m-1 rounded font-bold"
            >
              ←
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
