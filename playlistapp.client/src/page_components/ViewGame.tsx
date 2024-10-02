import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";
import "./game.css";

const ViewGame = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();

  useEffect(() => {
    setgame(games.find((x) => x.id === Number(gameId)));
  }, [games]);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="m-6">
          <div className="relative flex justify-center top-0 h-screen mt-[-6rem]">
            <img
              src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
              className={
                "object-cover object-top z-0 w-full h-full 2xl:px-64 xl:px-56 lg:px-44 md:px-32 sm:px-20 px-0 image-gradient"
              }
            />
          </div>
          <h1 className="dark:text-white text-black mt-[-60rem] text-8xl font-extrabold mx-28 underline"> {game?.title}</h1>
          <h1 className="dark:text-yellow-500 text-4xl font-extrabold mx-28 mt-8">Ratings: 9.25/10 - Leave your own.</h1>
        </div>
      </div>
      <button className="relative z-20 dark:text-white text-black">Add to Library</button>
    </>
  );
};

export default ViewGame;
