import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { Game, GameContextInterface } from "../@types/game";
import "./game.css";
import { PS5Icon } from "@/assets/SmallPlatforms/psLogo";
import { XboxIcon } from "@/assets/SmallPlatforms/xboxLogo";
import { EpicIcon } from "@/assets/SmallPlatforms/epicLogo";
import { SwitchIcon } from "@/assets/SmallPlatforms/swichLogo";
import AddButton from "@/individual_components/AddButton";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

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
        <div className="relative flex justify-center top-0 h-screen mt-[-6rem]">
          <img
            src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
            className={
              "object-cover object-top z-0 w-full h-full image-gradient"
            }
          />
        </div>
        <div className="mt-[-75rem] relative z-50 w-1/2">
          <h1 className="dark:text-white text-black text-8xl font-extrabold mx-28 underline">
            {" "}
            {game?.title}
          </h1>
          <h1 className="dark:text-yellow-500 text-4xl font-extrabold mx-28 mt-8">
            Ratings: 9.25/10 - Leave your own.
          </h1>
          <h1 className="w-3/4 dark:text-white text-black text-4xl font-extrabold mx-28 mt-8 line-clamp-3">
            {game?.description}
          </h1>
          <h1 className="w-3/4 dark:text-white text-black text-4xl font-extrabold mx-28 mt-8 line-clamp-3">
            Release:{" "}
            {game?.publishDate
              ? new Date(game.publishDate).toLocaleDateString(
                  undefined,
                  options
                )
              : ""}
          </h1>
          <div className="flex flex-row mx-28 my-8">
            <div className="p-4 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit mr-4">
              <PS5Icon height={35} width={35} darkColor="black" color="white" />
            </div>
            <div className="p-4 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit mx-4">
              <EpicIcon
                height={35}
                width={35}
                darkColor="black"
                color="white"
              />
            </div>
            <div className="p-4 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit mx-4">
              <SwitchIcon
                height={35}
                width={35}
                darkColor="black"
                color="white"
              />
            </div>
            <div className="p-4 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit mx-4">
              <XboxIcon
                height={35}
                width={35}
                darkColor="black"
                color="white"
              />
            </div>
          </div>
          <div className="flex flex-row mx-28 my-8">
            <AddButton area="Library" />
            <AddButton area="Wishlist" />
          </div>
        </div>
      </div>
      <button className="relative z-20 dark:text-white text-black">
        Add to Library
      </button>
    </>
  );
};

export default ViewGame;
