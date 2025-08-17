<aside className="w-40 p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-2">Found Letters</h2>
      <div className="flex flex-wrap gap-2">
        {[...discoveredLetters].map((letter) => (
          <span
            key={letter}
            className="w-8 h-8 flex items-center justify-center border rounded bg-yellow-100 text-lg font-bold"
          >
            {letter}
          </span>
        ))}
        {discoveredLetters.size === 0 && (
          <p className="text-gray-400 text-sm">None yet</p>
        )}
      </div>
    </aside>