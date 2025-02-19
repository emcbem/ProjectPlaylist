import React from "react";
import MasonryCards from "../individual_components/MasonryCards";
import { GameQueries } from "@/queries/GameQueries";
import MainLayout from "@/layout/MainLayout";
import LoadingPage from "@/individual_components/LoadingPage";

const HomePageLoggedIn: React.FC = () => {
  const { data: games, isLoading } = GameQueries.useGetAllGames();

  const slicedArray = games?.filter((item) => !!item.coverUrl).slice(0, 48);
  const slicedArray2 = games?.filter((item) => !!item.coverUrl).slice(49, 97);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <LoadingPage />
      </div>
    );
  }

  return (
    games && (
      <MainLayout>
        <div className="w-full min-h-screen bg-white dark:bg-black">
          <div className="w-full flex flex-col 2xl:text-5xl lg:text-4xl sm:text-3xl text-2xl bg-white text-black justify-start text-start dark:bg-black dark:text-white">
            <MasonryCards
              title={"New and Trending Games"}
              games={slicedArray ?? []}
            />

            <MasonryCards title={"Recommended"} games={slicedArray2 ?? []} />
          </div>
        </div>
      </MainLayout>
    )
  );
};

export default HomePageLoggedIn;
