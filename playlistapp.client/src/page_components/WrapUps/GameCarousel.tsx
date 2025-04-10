import { WrapUpCarouselGame } from "@/@types/WrapUps/WrapUpCarouselGame";
import Marquee from "@/components/ui/marquee";
import GameCard from "@/individual_components/GameCard";
import React from "react";

interface GameCarouselProps {
  carouselGames: WrapUpCarouselGame[] | undefined;
  userName: string;
}

const GameCarousel: React.FC<GameCarouselProps> = ({
  carouselGames,
  userName,
}) => {
  if (!carouselGames) {
    return;
  }
  return (
    <>
      <div className="text-center text-2xl dark:text-gray-200">
        {userName} played{" "}
        <span className="font-semibold text-4xl dark:text-white">
          {carouselGames.filter((x) => x.gameName.length > 0).length}
        </span>
        <br /> games
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg mt-3 mb-24">
        <Marquee pauseOnHover className="[--duration:50s]">
          {carouselGames?.map((game, index) =>
            game.coverURL ? (
              <React.Fragment key={index}>
                <GameCard
                  index={index}
                  cover={game.coverURL}
                  title={game.gameName}
                  publishDate={""}
                  description={""}
                  ageRating={""}
                />
              </React.Fragment>
            ) : (
              <></>
            )
          )}
        </Marquee>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white
       dark:from-black"
        ></div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white
       dark:from-black"
        ></div>
      </div>
    </>
  );
};

export default GameCarousel;
