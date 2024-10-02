import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";
import { useAuth0 } from "@auth0/auth0-react";
import { UserGameContext } from "../contexts/UserGameContext";
import { UserGameContextInterface } from "../@types/usergame";

const ViewGame = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;
  const { addUserGame } = React.useContext(UserGameContext) as UserGameContextInterface;
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();



  useEffect(() => {
    setgame(games.find((x) => x.id === Number(gameId)));
  }, [games]);

  const addGameToLibrary = () => {
    addUserGame(Number(gameId));
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="m-6">
          <h1 className="text-white">{game?.title}</h1>
          <p className="text-white">Game Id: {gameId}</p>
          <div className="relative flex justify-center top-0 h-screen mt-[-10rem]">
            <img
              src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
              className="object-cover object-top z-0 w-full h-full pt-2 px-64"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black"></div>
          </div>

          {/* Darker gradient overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_10%,black_80%)] opacity-90"></div>
        </div>
      </div>
      {!isAuthenticated ?
        <p><span onClick={() => loginWithRedirect()} className="text-blue-600 underline">Log in</span> to add to library.</p>
        :
        <button className="relative z-20" onClick={addGameToLibrary}>Add to Library</button>
      }
    </>
  );
};

export default ViewGame;
