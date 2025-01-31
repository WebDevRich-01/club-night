import React, { useState, useEffect } from "react";
import PlayerQueue from "./components/PlayerQueue";
import NextPlayers from "./components/NextPlayers";
import Court from "./components/Court";
import logo from "./assets/lansdown-logo.png"; // Adjust the path as needed

function App() {
  const loadState = () => {
    const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const savedCourts = JSON.parse(localStorage.getItem("courts")) || [
      { id: 1, players: [], isAvailable: true },
      { id: 2, players: [], isAvailable: true },
      { id: 3, players: [], isAvailable: true },
      { id: 4, players: [], isAvailable: true },
    ];
    return { savedPlayers, savedCourts };
  };
  
  
  const { savedPlayers, savedCourts } = loadState();
  const [players, setPlayers] = useState(savedPlayers);
  const [newPlayerName, setNewPlayerName] = useState(""); // State to store the new player's name
  const [courts, setCourts] = useState(savedCourts);

  // Save state to localStorage whenever players or courts change
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("courts", JSON.stringify(courts));
  }, [players, courts]);

  // Function to add a new player to the queue
  const addPlayer = () => {
    if (newPlayerName.trim() === "") return; // Don't add empty names
    setPlayers([...players, { id: Date.now(), name: newPlayerName }]);
    setNewPlayerName(""); // Clear the input field
  };

  // Function to delete a player from the queue
  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  // Function to handle the "Play" button click
  const handlePlay = () => {
    if (players.length >= 2) {
      const nextPlayers = players.slice(0, 2); // Get the top two players
      const updatedPlayers = players.slice(2); // Remove them from the queue

      // Find the first available court
      const availableCourt = courts.find(
        (court) => court.isAvailable && court.players.length === 0
      );
      if (availableCourt) {
        const updatedCourts = courts.map((court) =>
          court.id === availableCourt.id
            ? { ...court, players: nextPlayers }
            : court
        );
        setCourts(updatedCourts);
        setPlayers(updatedPlayers);
      } else {
        alert("No available courts.");
      }
    } else {
      alert("Not enough players in the queue.");
    }
  };

  // Function to handle the "Finished" button click
  const handleFinish = (courtId) => {
    const updatedCourts = courts.map((court) =>
      court.id === courtId ? { ...court, players: [] } : court
    );
    setCourts(updatedCourts);
    setPlayers([...players, ...courts.find((court) => court.id === courtId).players]);
  };

  // Function to toggle court availability
  const toggleCourtAvailability = (courtId) => {
    const updatedCourts = courts.map((court) =>
      court.id === courtId ? { ...court, isAvailable: !court.isAvailable } : court
    );
    setCourts(updatedCourts);
  };

  // Get the top two players from the queue
  const nextPlayers = players.slice(0, 2);

  // Function to clear all data
  const clearAll = () => {
    setPlayers([]);
    setCourts([
      { id: 1, players: [], isAvailable: true },
      { id: 2, players: [], isAvailable: true },
      { id: 3, players: [], isAvailable: true },
      { id: 4, players: [], isAvailable: true },
    ]);
  };

  return (
    <div className="min-h-screen  bg-[#82cfed] p-8 flex flex-col">
      {/* Logo Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img
            src={logo} // Use the imported logo
            alt="Lansdown Squash"
            className="h-10" // Adjust the height as needed
          />
        </div>
        <button
          onClick={clearAll}
          className="ml-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-8">
        {/* First Column: Next Players and Player Queue */}
        <div className="flex flex-col w-1/2 gap-8">
          {/* Next Players Section */}
          <div className=" bg-white p-6 rounded-lg shadow-md h-66 flex flex-col">
            <NextPlayers players={nextPlayers} onPlay={handlePlay} />
          </div>

          {/* Player Queue Section */}
          <div className="bg-gray-100/50 p-6 rounded-lg shadow-md flex-1 flex flex-col">
            <PlayerQueue
              newPlayerName={newPlayerName}
              setNewPlayerName={setNewPlayerName}
              players={players}
              setPlayers={setPlayers}
              addPlayer={addPlayer}
              deletePlayer={deletePlayer}
            />
          </div>
        </div>

        {/* Second Column: Courts */}
        <div className="flex flex-col w-1/2 gap-8">
          {courts.map((court) => (
            <div key={court.id} className={`bg-white p-4 rounded-lg shadow-md border border-5 ${
              court.isAvailable ? "flex-1 border-red-500" : "h-24 border-gray-50" // Adjust height for disabled courts
            }  transition-all duration-300`}>
              <Court
                courtId={court.id}
                players={court.players}
                isAvailable={court.isAvailable}
                onFinish={() => handleFinish(court.id)}
                onToggleAvailability={() => toggleCourtAvailability(court.id)}
              />
            </div>
          ))}
        </div>
      </div >
    </div >
  );
}

export default App;