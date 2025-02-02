import React from "react";
import Switch from "@mui/material/Switch";

const Court = ({ courtId, players, isAvailable, onFinish, onToggleAvailability }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Court {courtId}</h2>
        <Switch
          defaultChecked
          onClick={onToggleAvailability}
        />
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
            className="mt-4 w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Finished
          </button>
        </>
      )}
    </div>
  );
};

export default Court;