import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";

const ViewGame = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();

  useEffect(() => {
    console.log(games);
    setgame(games.find((x) => x.id === Number(gameId)));

  }, []);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="m-6">
          <h1 className="">Game!!</h1>
          <p>{gameId}</p>
          <img src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")} />
          <p>{game?.title}</p>
        </div>
      </div>
    </>
  );
};

export default ViewGame;
