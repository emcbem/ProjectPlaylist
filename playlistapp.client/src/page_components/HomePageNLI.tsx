import React from "react";
import HorizontalRule from "../individual_components/HorizontalRule";
import CardCarousel from "../individual_components/InfiniteCardScroll";
import ExpandingColumns from "../individual_components/Platforms";
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { GameContextInterface } from "../@types/game";

const HomePageNLI: React.FC = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex 2xl:text-8xl xl:text-7xl lg:text-6xl sm:text-5xl text-4xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="md:w-1/2 sm:w-3/4 w-5/6 sm:my-20 my-10 font-bold">
            Explore your gaming library like never before.
          </div>
          
        </div>
        
        <CardCarousel list={games} reverse={false} />
        <CardCarousel list={games} reverse={true} />
        <HorizontalRule />
        <div className="flex 2xl:text-6xl xl:text-6xl sm:text-4xl text-3xl bg-white text-black justify-center text-center dark:bg-black dark:text-white">
          <div className="md:w-1/2 sm:w-3/4 w-5/6 font-bold">Connect all of your platforms.</div>
        </div>
        <ExpandingColumns />
        <Link to="/search">
            <button className="text-white">Search Page</button>
          </Link>
      </div>
    </>
  );
};

export default HomePageNLI;
