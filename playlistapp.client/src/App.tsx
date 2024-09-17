import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import axios from "axios";
import Profile from "./Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth0/login";

const URL = "https://localhost:7041";

interface Game {
  title: string;
  description: string;
  ageRating: string;
  publishDate: Date;
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
  const { isAuthenticated } = useAuth0();

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
    <div className="max-h-screen flex flex-col">
      <Navbar />
      {games.map((game, index) => (
        <div
          className="flex flex-col rounded-lg bg-[#D9D9D9] md:max-w-xl md:flex-row w-100 m-5"
          key={index}
        >
          <img
            className="w-64 h-64 object-cover rounded-lg md:rounded-l-lg"
            src={game.coverUrl}
            alt={`Game Cover ${index}`}
          />
          <div className="flex flex-col justify-start p-6  w-1/2">
            <h5 className="mb-2 text-xl font-medium text-neutral-800">
              {game.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600">
              <span>
                {" "}
                Release Date: {new Date(game.publishDate).toLocaleDateString()}
              </span>
            </p>
            <p className="mb-4 text-base text-neutral-600 line-clamp-3">
              {game.description}
            </p>
            <p className="mb-4 text-base text-neutral-600 flex">
              Age Rating: {game.ageRating}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
