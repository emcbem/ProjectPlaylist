import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Game } from "../@types/game";
import MasonryCardItem from "./MasonryCardItem";

interface props {
  title: string;
  games: Game[];
}

const MasonryCards: React.FC<props> = ({ title, games }) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="w-full dark:text-white text-black">
      <div
        className={`sm:mt-8 pt-10 font-bold pb-5 underline ${
          expand ? `sticky top-0` : ""
        } z-20 dark:bg-black bg-white`}
      >
        {title}
      </div>

      <div
        className={`relative ${
          expand
            ? " "
            : "overflow-hidden lg:h-[50rem] md:h-[45rem] sm:h-[40rem] h-[25rem]"
        }  `}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            300: 2,
            600: 4,
            1800: 5,
          }}
        >
          <Masonry gutter="10px">
            {games.map((g, key) => (
              <MasonryCardItem game={g} key={key} />
            ))}
          </Masonry>
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
