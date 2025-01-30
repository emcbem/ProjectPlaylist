import { useState } from "react";
import { SteamQueries } from "@/queries/SteamQueries";
import { useAuth0 } from "@auth0/auth0-react";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [steamId, setSteamId] = useState(""); // State to hold the Steam ID input
  const { data: games, mutateAsync } = SteamQueries.useGetUserDataForOneGame(steamId);

  const handleGetGames = async () => {
    if (steamId) {
      await mutateAsync(); // Pass the steamId when mutating
    } else {
      console.error("Please enter a Steam ID.");
    }
  };

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1 className="text-6xl">Test Page</h1>
        <input
          type="text"
          placeholder="Enter Steam ID"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)} // Update state on input change
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <button onClick={handleGetGames} className="bg-blue-500 text-white p-2 rounded">
          Click
        </button>
        <div>
          {games?.map((x) => (
            <p key={x.platformGameId}>
              {x.gameTitle}, {x.platformGameId}, {x.steamPlayTime} minutes
            </p>
          ))}
        </div>
      </div>
    )
  );
};

export default TestPage;
