import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaGripVertical, FaTrash } from "react-icons/fa"; // Import the drag handle icon

const PlayerQueue = ({ players, newPlayerName, addPlayer, deletePlayer, setNewPlayerName, setPlayers }) => {

  // Function to handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const items = Array.from(players);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPlayers(items);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Player Queue</h2>

      {/* Input field for adding a new player */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="flex-1 p-2 border border-[#272660] rounded-l focus:outline-none focus:ring-none focus:ring-blue-500"
        />
        <button
          onClick={addPlayer}
          className="px-4 bg-[#272660] text-white rounded-r"
        >
          Add Player
        </button>
      </div>

      {/* List of players with drag-and-drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="players">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-1 overflow-y-auto"
            >
              {players.map((player, index) => (
                <Draggable
                  key={player.id}
                  draggableId={player.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between p-3 shadow-md hover:shadow-md transition-shadow mb-2 ${
                        snapshot.isDragging ? "bg-white/80 scale-105" : " bg-white"
                      }`}
                    >
                      {/* Drag Handle Icon */}
                      <div className="text-gray-400">
                        <FaGripVertical />
                      </div>
                      <span className="text-gray-700 ml-2 flex-1">{player.name}</span>
                      <button
                        onClick={() => deletePlayer(player.id)}
                        className="text-gray-500 flex justify-between"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PlayerQueue;