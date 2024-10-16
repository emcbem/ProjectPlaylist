import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PS5Icon } from "../assets/ViewGameSVGs/psLogo";
import { SteamIcon } from "../assets/ViewGameSVGs/steamLogo";
import { XboxIcon } from "../assets/ViewGameSVGs/xboxLogo";
import { Game } from "../@types/game";
import { Link } from "react-router-dom";

interface props {
  title: string;
  games: Game[];
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const MasonryCards: React.FC<props> = ({ title, games }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const cards = games.map((game) => {
    const randomHeight = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    return (
      <Link to={`/view-game/${game.id}`} key={game.id}>
        <div className="rounded-lg overflow-hidden text-white dark:text-black">
          <img
            src={game.coverUrl}
            className={`w-full sm:h-[${randomHeight}px] h-[${
              randomHeight / 2
            }px] object-cover`}
          />
          <div className="bg-[#252A2C] dark:bg-[#D9D9D9]">
            <div className="flex flex-row p-2">
              <PS5Icon height={20} width={20} darkColor="black" color="white" />
              <XboxIcon
                height={20}
                width={20}
                darkColor="black"
                color="white"
              />
              <SteamIcon
                height={20}
                width={20}
                darkColor="black"
                color="white"
              />
            </div>
            <div className="sm:text-2xl text-base px-2 pt-2 font-extrabold">
              {game.title}
            </div>
            <div className="sm:text-base text-xs px-2 pt-2 ">
              Rating: {game.ageRating}
            </div>
            <div className="sm:text-base text-xs px-2 py-2 ">
              Release:{" "}
              {game.publishDate
                ? new Date(game.publishDate).toLocaleDateString(
                    undefined,
                    options
                  )
                : ""}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="flex-grow w-full dark:text-white text-black">
      <div
        className={`sm:mt-20 pt-10 font-bold lg:mx-20 md:mx-15 sm:mx-10 mx-5 pb-5 underline ${
          expand ? `sticky top-0` : ""
        } z-20 dark:bg-black bg-white`}
      >
        {title}
      </div>

      <div
        className={`relative lg:mx-20 md:mx-15 sm:mx-10 mx-5 ${
          expand
            ? " "
            : "overflow-hidden lg:h-[50rem] md:h-[45rem] sm:h-[40rem] h-[25rem]"
        }  `}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            300: 2,
            600: 3,
            900: 4,
            1100: 5,
            1600: 6,
            1800: 8,
          }}
        >
          <Masonry gutter="10px">{cards}</Masonry>
        </ResponsiveMasonry>
        {!expand && (
          <div className="absolute bottom-0 left-0 bg-gradient-to-b from-transparent dark:to-black dark:via-black/80 to-white via-white/80 from-20% via-40% to-100% w-full h-96 z-10"></div>
        )}
      </div>
      <div
        className=" flex lg:text-2xl md:text-xl sm:text-lg text-base font-bold lg:mx-20 md:mx-15 sm:mx-10 mx-5 mb-5 justify-end cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        {expand ? "See Less." : "See more."}
      </div>
    </div>
  );
};

export default MasonryCards;
