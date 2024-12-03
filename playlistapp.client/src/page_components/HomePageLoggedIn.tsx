import React from "react";
import MasonryCards from "../individual_components/MasonryCards";
import { Link } from "react-router-dom";
import { GameQueries } from "@/queries/GameQueries";

const HomePageLoggedIn: React.FC = () => {
  const { data: games } = GameQueries.useGetAllGames();

  const slicedArray = games?.filter((item) => !!item.coverUrl).slice(0, 48);
  const slicedArray2 = games?.filter((item) => !!item.coverUrl).slice(49, 97);

  return (
    games && (
      <>
        <div className="min-h-screen bg-white dark:bg-black">
          <div className="flex flex-col 2xl:text-5xl lg:text-4xl sm:text-3xl text-2xl bg-white text-black justify-start text-start dark:bg-black dark:text-white">
            <MasonryCards
              title={"New and Trending Games"}
              games={slicedArray ?? []}
            />

            <MasonryCards title={"Recommended"} games={slicedArray2 ?? []} />
          </div>
        </div>
        <Link to="/search">
          <button className="text-white">Search Page</button>
        </Link>
      </>
    )
  );
};

export default HomePageLoggedIn;
