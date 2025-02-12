// import { useState } from "react";
// import { SteamQueries } from "@/queries/SteamQueries";
// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";

const TestPage = () => {
  const { userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;
  // const { data: games, mutateAsync } =
  //   SteamQueries.useGetSteamActionLog();

  // const handleGetGames = async () => {
  //   if (steamId) {
  //     await mutateAsync(); // Pass the steamId when mutating
  //   } else {
  //     console.error("Please enter a Steam ID.");
  //   }
  // };

  const handleAuth = async () => {
    if (userGuid != undefined) {
      window.location.href = `${
        import.meta.env.VITE_URL
      }/Steam/auth/${userGuid}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* <h1 className="text-6xl">Test Page</h1>
      <input
        type="text"
        placeholder="Enter Steam ID"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)} // Update state on input change
        className="border border-gray-300 rounded p-2 mb-4 color-gray-900"
      />
      <button
        onClick={handleGetGames}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Click
      </button>
      <div>
        {games?.map((x) => (
          <div className="my-6 p-4">
            <img src={`${x.imageUrl}`} />
            <p key={x.platformGameId}>
              {x.gameTitle}, {x.platformGameId}, {x.steamPlayTime} minutes
            </p>
          </div>
        ))}
      </div> */}
      <button onClick={handleAuth}>Steam Auth</button>
    </div>
  );
};

export default TestPage;
