import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";
import "./game.css";
import AddButton from "@/individual_components/AddButton";
import PlatformIconList from "@/individual_components/PlatformIconList";
import { GameDetails } from "@/individual_components/GameDetails";
import GameImageBackground from "@/individual_components/GameImageBackground";

const ViewGame = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;
  // const { addUserGame } = React.useContext(UserGameContext) as UserGameContextInterface;
  // const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();

  useEffect(() => {
    setgame(games.find((x) => x.id === Number(gameId)));
  }, [games]);

  // const addGameToLibrary = () => {
  //   addUserGame(Number(gameId));
  // }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <GameImageBackground Game={game} />
        <div className="absolute top-1/3 lg:left-1/6 left-0 z-50 3xl:w-1/2 md:w-2/3 w-full">
          <GameDetails Game={game} />
          <PlatformIconList GameId={game?.id}/>
          <AddButton />
        </div>
      </div>
    </>
  );
};

export default ViewGame;
