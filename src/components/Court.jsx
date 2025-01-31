import React from "react";

const Court = ({ courtId, players, isAvailable, onFinish, onToggleAvailability }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Court {courtId}</h2>
        <button
          onClick={onToggleAvailability}
          className={`px-4 py-2 rounded ${
            isAvailable
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isAvailable ? "focus:ring-green-500" : "focus:ring-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Booked"}
        </button>
      </div>

      {/* Show players and "Finished" button only if the court is available */}
      {isAvailable && (
        <>
          <div className="flex-1 overflow-y-auto">
            {players.length > 0 ? (
              players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-[#f4fbfd] shadow-md mb-2"
                >
                  <span className="text-gray-700">{player.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Court is empty.</p>
            )}
          </div>
          <button
            onClick={onFinish}
            disabled={players.length === 0 || !isAvailable}
            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Finished
          </button>
        </>
      )}
    </div>
  );
};

export default Court;