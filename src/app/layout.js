import "./globals.css";

export const metadata = {
  title: "Word Game",
  description: "A simple single-player Wordle-style game in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
