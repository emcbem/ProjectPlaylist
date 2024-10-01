import React from "react";
import { Game } from "../App";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import MasonryCards from "../individual_components/MasonryCards";

interface Props {
  allGames: Game[];
}

const HomePageLoggedIn: React.FC<Props> = ({ allGames }) => {
  const slicedArray = allGames.slice(0, 48);
  const slicedArray2 = allGames.slice(49, 97);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex flex-col 2xl:text-5xl lg:text-4xl sm:text-3xl text-2xl bg-white text-black justify-start text-start dark:bg-black dark:text-white">
          <MasonryCards title={"New and Trending Games"} games={slicedArray} />

          <MasonryCards title={"Recommended"} games={slicedArray2} />
        </div>
      </div>
    </>
  );
};

export default HomePageLoggedIn;
