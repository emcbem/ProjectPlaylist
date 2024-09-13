import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import axios from "axios";

const URL = "https://localhost:7041";

interface Game {
  coverUrl: string;
}

const fetchAllGames = async () => {
  try {
    const response = await axios.get<Game[]>(`${URL}/game/getall`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch games:", error);
    throw error;
  }
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames(data);
        console.log("GAMES", data);
      } catch (err) {
        setError("Failed to fetch games");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {games.map((game, index) => (
        <img
          key={index}
          src={game.coverUrl}
          alt={`Game Cover ${index}`}
        />
      ))}
    </div>
  );
}

export default App;
