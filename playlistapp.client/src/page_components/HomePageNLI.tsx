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
      <div className="min-h-screen bg-black">
        <div className="flex lg:text-8xl sm:text-6xl text-4xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="lg:w-1/2 sm:w-3/4 w-5/6 my-20 font-bold">
            Explore your gaming library like never before.
          </div>
        </div>
        <CardCarousel list={allGames} reverse={false} />
        <CardCarousel list={allGames} reverse={true} />
        <HorizontalRule />
        <div className="flex text-6xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="w-1/2 font-bold">Connect all of your platforms.</div>
        </div>
        <ExpandingColumns />
      </div>
    </>
  );
};

export default HomePageNLI;
