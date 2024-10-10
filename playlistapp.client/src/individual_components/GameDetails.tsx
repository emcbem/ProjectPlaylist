import { Game } from "@/@types/game";
import React from "react";

interface props {
  Game: Game | undefined;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const GameDetails: React.FC<props> = ({ Game }) => {
  return (
    <>
      <h1 className="dark:text-white text-black font-extrabold lg:mx-28 mx-12 underline 2xl:text-5xl xl:text-3xl lg:text-1xl text-2xl">
        {Game?.title}
      </h1>
      <h1 className="dark:text-yellow-500 2xl:text-2xl xl:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 ">
        Ratings: 9.25/10 - Leave your own.
      </h1>
      <h1 className="w-3/4 dark:text-white text-black 2xl:text-2xl xl:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 line-clamp-3">
        {Game?.description}
      </h1>
      <h1 className="w-3/4 dark:text-white text-black 2xl:text-2xl xl:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 line-clamp-3">
        Release:{" "}
        {Game?.publishDate
          ? new Date(Game.publishDate).toLocaleDateString(undefined, options)
          : ""}
      </h1>
    </>
  );
};
