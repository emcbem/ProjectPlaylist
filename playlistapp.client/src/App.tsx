import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import axios from "axios";

const URL = "https://localhost:7041";

interface Game {
  coverUrl: string;
}

export const fetchAllGames = async () => {
  try {
    const response = await axios.get<Game>(`${URL}/game/getall`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch games:", error);
    throw error;
  }
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames((x) => [...x, data]);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

  console.log(games);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {games.map((x) => {
        return (
          <>
            <img src={"https://" + x.coverUrl} />
          </>
        );
      })}
    </div>
  );
}

export default App;
