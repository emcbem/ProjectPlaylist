import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";
import "./game.css";
import AddButton from "@/individual_components/AddButton";
import PlatformIconList from "@/individual_components/PlatformIconList";
import { GameDetails } from "@/individual_components/GameDetails";
import GameImageBackground from "@/individual_components/GameImageBackground";
import { UserGameContext } from "@/contexts/UserGameContext";
import { UserGameContextInterface } from "@/@types/usergame";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { PlatformGameContext } from "@/contexts/PlatformGameContext";
import { PlatformGameContextInterface } from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/addUserGameRequest";

const ViewGame = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;

  const { platformGames, mutatePlatformGames } = React.useContext(
    PlatformGameContext
  ) as PlatformGameContextInterface;

  const { AddUserGame } = React.useContext(
    UserGameContext
  ) as UserGameContextInterface;

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();
  const [addUserGameRequest, setAddUserGameRequest] =
    useState<AddUserGameRequest>();

  useEffect(() => {
    if (platformGames && usr && gameId) {
      const platformGame = platformGames.find(
        (x) => x && x.game.id && x.game.id === Number(gameId)
      );
      if (platformGame && usr.guid) {
        setAddUserGameRequest({
          userId: usr.guid,
          platformGameId: platformGame.id,
        });
      }
    }
  }, [platformGames, usr, gameId]);

  useEffect(() => {
    setgame(games.find((x) => x.id === Number(gameId)));
    mutatePlatformGames();
  }, [games, gameId]);

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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => addUserGameRequest && AddUserGame(addUserGameRequest)}
        disabled={!addUserGameRequest}
      >
        Add to Library
      </button>
    </>
  );
};

export default ViewGame;
