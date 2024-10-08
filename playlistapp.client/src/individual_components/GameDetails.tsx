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
      <h1 className="dark:text-white text-black font-extrabold lg:mx-28 mx-12 underline 2xl:text-8xl xl:text-6xl lg:text-4xl md:text-3xl text-2xl">
        {Game?.title}
      </h1>
      <h1 className="dark:text-yellow-500 2xl:text-4xl xl:text-2xl lg:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 ">
        Ratings: 9.25/10 - Leave your own.
      </h1>
      <h1 className="w-3/4 dark:text-white text-black 2xl:text-4xl xl:text-2xl lg:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 line-clamp-3">
        {Game?.description}
      </h1>
      <h1 className="w-3/4 dark:text-white text-black 2xl:text-4xl xl:text-2xl lg:text-xl text-base font-extrabold lg:mx-28 mx-12 2xl:mt-8 xl:mt-6 lg:mt-4 mt-2 line-clamp-3">
        Release:{" "}
        {Game?.publishDate
          ? new Date(Game.publishDate).toLocaleDateString(undefined, options)
          : ""}
      </h1>
    </>
  );
};
