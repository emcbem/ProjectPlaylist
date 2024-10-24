import { Game } from "@/@types/game";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const MasonryCardItem: FC<{ game: Game }> = ({ game }) => {
  const [randomHeight] = useState(
    Math.floor(Math.random() * (300 - 200 + 1) + 200)
  );
  
  return (
    <Link to={`/view-game/${game.id}`} key={game.id}>
      <div className="rounded-lg overflow-hidden text-white dark:text-white">
        <img
          src={game.coverUrl}
          className={`w-full sm:h-[${randomHeight}px] h-[${
            randomHeight / 2
          }px] object-cover`}
        />
        <div className="bg-clay-200 dark:bg-clay-400 pt-3">
          {/* <div className="flex flex-row p-2">
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
            </div> */}
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
};

export default MasonryCardItem;
