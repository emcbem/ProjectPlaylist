import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GameContext } from "../context/GameContext";
import { GameContextInterface } from "../@types/game";

const HomePageLoggedIn: React.FC = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;

  const slicedArray = games.slice(0, 24);
  const slicedArray2 = games.slice(25, 49);

  const items = slicedArray.map((games, index) => {
    const randomHeight = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    console.log(randomHeight);
    return (
      <img
        key={index}
        src={games.coverUrl}
        style={{
          width: "100%",
          height: `${randomHeight}px`,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    );
  });

  const items2 = slicedArray2.map((games, index) => {
    const randomHeight = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    console.log(randomHeight);
    return (
      <img
        key={index}
        src={games.coverUrl}
        style={{
          width: "100%",
          height: `${randomHeight}px`,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    );
  });

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex flex-wrap 2xl:text-5xl lg:text-4xl sm:text-3xl text-2xl bg-white text-black justify-start text-start dark:bg-black dark:text-white">
          <div className="w-full">
            <div className=" sm:mt-20 mt-10 font-bold mx-20 mb-5 underline">
              New and Trending Games
            </div>

            <div className="w-5/6 mx-20">
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  300: 2,
                  500: 3,
                  700: 4,
                  900: 5,
                  1100: 6,
                  1300: 7,
                  1500: 8,
                }}
              >
                <Masonry gutter="10px">{items}</Masonry>
              </ResponsiveMasonry>
            </div>
          </div>

          <div className="w-full">
            <div className=" sm:mt-20 mt-10 font-bold mx-20 mb-5 underline">
              Recommended for you
            </div>

            <div className="w-5/6 mx-20">
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  300: 2,
                  500: 3,
                  700: 4,
                  900: 5,
                  1100: 6,
                  1300: 7,
                  1500: 8,
                }}
              >
                <Masonry gutter="10px">{items2}</Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageLoggedIn;
