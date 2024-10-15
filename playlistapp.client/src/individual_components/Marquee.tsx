import { GameContextInterface } from "@/@types/game";
import Marquee from "@/components/ui/marquee";
import { GameContext } from "@/contexts/GameContext";
import React from "react";
import GameCard from "./GameCard";

export function GameMarquee() {
  const { games } = React.useContext(GameContext) as GameContextInterface;

  const firstRow = games.slice(0, games.length / 2);
  const secondRow = games.slice(games.length / 2);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:600s]">
        {firstRow.map((game, index) =>
          game.coverUrl ? (
            <GameCard
              index={index}
              cover={game.coverUrl}
              title={game.title}
              publishDate={String(game.publishDate)}
              description={game.description}
              ageRating={game.ageRating}
            />
          ) : (
            <></>
          )
        )}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:600s]">
        {secondRow.map((game, index) =>
          game.coverUrl ? (
            <GameCard
              index={index}
              cover={game.coverUrl}
              title={game.title}
              publishDate={String(game.publishDate)}
              description={game.description}
              ageRating={game.ageRating}
            />
          ) : (
            <></>
          )
        )}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
    </div>
  );
}
