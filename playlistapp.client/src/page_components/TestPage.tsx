// import { useState } from "react";
// import { SteamQueries } from "@/queries/SteamQueries";
// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { SteamQueries } from "@/queries/SteamQueries";
import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";

const TestPage = () => {
  const { userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const steamActionLogRequest: SteamActionLogRequest = {
    userId: "f776d4d8-a6f5-44db-9960-6165a1b1535b",
    userSteamId: "76561198989710406",
  };
  const { data: steamActionLog, mutateAsync } =
    SteamQueries.useGetSteamActionLog(steamActionLogRequest);

  // const { data: games, mutateAsync } =
  //   SteamQueries.useGetSteamActionLog();

  const handleGetGames = async () => {
    if (steamActionLogRequest) {
      await mutateAsync(); // Pass the steamId when mutating
    } else {
      console.error("Please enter a Steam ID.");
    }
  };

  const handleAuth = async () => {
    if (userGuid != undefined) {
      window.location.href = `${
        import.meta.env.VITE_URL
      }/Steam/auth/${userGuid}`;
    }
  };

  console.log(steamActionLog);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <h1 className="text-6xl">Test Page</h1>

      <button
        onClick={handleGetGames}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Click
      </button>
      {steamActionLog?.itemOptions.map((x) => (
        <p>{x.errorText}</p>
      ))}
      <button onClick={handleAuth}>Steam Auth</button>
    </div>
  );
};

export default TestPage;
