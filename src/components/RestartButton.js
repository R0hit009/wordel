"use client";

export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Restart Game
    </button>
  );
}
