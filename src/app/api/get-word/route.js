export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || "medium";

  // Example words
  const words = {
    easy: ["CATS", "LION", "MOON", "TREE"],
    medium: ["APPLE", "HOUSE", "CHAIR", "WATER"],
    hard: ["PLANET", "BRIDGE", "MARKER", "FUTURE"]
  };

  const wordList = words[level] || words.medium;
  const word = wordList[Math.floor(Math.random() * wordList.length)];

  return new Response(
    JSON.stringify({ word, wordLength: word.length }),
    { status: 200 }
  );
}
