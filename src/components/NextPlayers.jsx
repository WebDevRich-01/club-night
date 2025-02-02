import React from "react";

const NextPlayers = ({ players, onPlay }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Next Players</h2>
      <div className="flex-1 overflow-y-auto">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-[#f4fbfd] shadow-md mb-2"
            >
              <span className="text-gray-700">{player.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No players in the queue.</p>
        )}
      </div>
      <button
        onClick={onPlay}
        className="mt-4 w-full px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Play
      </button>
    </div>
  );
};

export default NextPlayers;