let dailyWord = "APPLE";

export async function POST(req) {
  const { guess } = await req.json();

  if (!guess || guess.length !== dailyWord.length) {
    return new Response(JSON.stringify({ error: "Invalid guess" }), { status: 400 });
  }

  let result = guess.toUpperCase().split("").map((letter, idx) => {
    if (letter === dailyWord[idx]) return { letter, status: "correct" };
    if (dailyWord.includes(letter)) return { letter, status: "present" };
    return { letter, status: "absent" };
  });

  // ✅ Build letterStatus map for tracker
  let letterStatus = {};
  result.forEach(({ letter, status }) => {
    // Only overwrite if it's "better" (correct > present > absent)
    if (
      !letterStatus[letter] ||
      (letterStatus[letter] === "present" && status === "correct") ||
      (letterStatus[letter] === "absent" && status !== "absent")
    ) {
      letterStatus[letter] = status;
    }
  });

  return new Response(
    JSON.stringify({
      result,
      isCorrect: guess.toUpperCase() === dailyWord,
      letterStatus, // ✅ return tracker info here
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
