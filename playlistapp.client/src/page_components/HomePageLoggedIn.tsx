import React from "react";
import { GameContext } from "../contexts/GameContext";
import { GameContextInterface } from "../@types/game";
import MasonryCards from "../individual_components/MasonryCards";
import { Link } from "react-router-dom";

const HomePageLoggedIn: React.FC = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;

  const slicedArray = games.slice(0, 48);
  const slicedArray2 = games.slice(49, 97);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex flex-col 2xl:text-5xl lg:text-4xl sm:text-3xl text-2xl bg-white text-black justify-start text-start dark:bg-black dark:text-white">
          <MasonryCards title={"New and Trending Games"} games={slicedArray} />

          <MasonryCards title={"Recommended"} games={slicedArray2} />
        </div>
      </div>
      <Link to="/search">
        <button className="text-white">Search Page</button>
      </Link>
    </>
  );
};

export default HomePageLoggedIn;
