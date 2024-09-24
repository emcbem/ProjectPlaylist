import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import axios from "axios";
//import { useAuth0 } from "@auth0/auth0-react";
import CardCarousel from "./component/InfiniteCardScroll";
import TempComponent from "./component/TempComponent";


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
      <div className="flex text-8xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
        <div className="w-1/2 my-20 font-bold">
          Explore your gaming library like never before.
        </div>
      </div>
      <CardCarousel list={games} reverse={false} />
      <CardCarousel list={games} reverse={true} />
      <TempComponent />
    </div>
  );
}

export default App;

// #EDBD68 to #602B53
