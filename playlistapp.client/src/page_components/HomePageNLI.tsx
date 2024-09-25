import React from "react";
import TempComponent from "../individual_components/TempComponent";
import HorizontalRule from "../individual_components/HorizontalRule";
import CardCarousel from "../individual_components/InfiniteCardScroll";
import { Game } from "../App";
import ExpandingColumns from "../individual_components/Platforms";

interface props {
  allGames: Game[];
}

const HomePageNLI: React.FC<props> = ({ allGames }) => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex 2xl:text-8xl xl:text-7xl lg:text-6xl sm:text-5xl text-4xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="md:w-1/2 sm:w-3/4 w-5/6 sm:my-20 my-10 font-bold">
            Explore your gaming library like never before.
          </div>
        </div>
        <CardCarousel list={allGames} reverse={false} />
        <CardCarousel list={allGames} reverse={true} />
        <HorizontalRule />
        <div className="flex 2xl:text-6xl xl:text-6xl sm:text-4xl text-3xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="md:w-1/2 sm:w-3/4 w-5/6 font-bold">Connect all of your platforms.</div>
        </div>
        <ExpandingColumns />
      </div>
    </>
  );
};

export default HomePageNLI;
