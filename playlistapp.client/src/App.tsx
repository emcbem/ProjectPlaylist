import { useEffect, useState } from "react";
import Navbar from "./individual_components/Navbar";
import axios from "axios";
import HomePageNLI from "./page_components/HomePageNLI";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./page_components/SearchPage";



export interface Game {
  title: string;
  description: string;
  ageRating: string;
  publishDate: Date;
  coverUrl: string;
}

console.log(import.meta.env.VITE_URL)

const fetchAllGames = async () => {
  try {
    const response = await axios.get<Game[]>(`${import.meta.env.VITE_URL}/game/getall`);
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
  //const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames(data);
      } catch (err) {
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EDBD68] to-[#602B53] p-2">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageNLI allGames={games} />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;

// #EDBD68 to #602B53
