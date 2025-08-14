let dailyWord = "APPLE"; // Can be replaced with random logic

export async function GET() {
  return new Response(JSON.stringify({ wordLength: dailyWord.length }), {
    headers: { "Content-Type": "application/json" }
  });
}
