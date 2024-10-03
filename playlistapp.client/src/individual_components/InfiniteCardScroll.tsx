import React, { useEffect, useRef } from "react";
import GameCard from "./GameCard";
import { Game } from "../@types/game";

interface props {
  list: Game[];
  reverse: boolean;
}

const CardCarousel: React.FC<props> = ({ list, reverse }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const firstList = container.querySelector("ul");
      if (firstList) {
        const clone = firstList.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        container.appendChild(clone);
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-white dark:bg-black inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,white_0,_black_128px,_black_calc(100%-128px),white_100%)] lg:p-8 sm:p-6 p-4"
    >
      <ul
        className={`flex items-center justify-center md:justify-start lg:[&_li]:mx-16 md:[&_li]:mx-12 [&_li]:mx-8 [&_img]:max-w-none  ${
          reverse
            ? `animate-infinite-scroll-reverse`
            : `animate-infinite-scroll`
        }`}
      >
        {list.map((game, index) => (
          <li
            key={index}
            className="inline-flex flex-none mx-5 drop-shadow-[0_0px_10px_rgba(96,43,83,2)] dark:drop-shadow-[0_0px_10px_rgba(237,189,104,2)]"
          >
            <GameCard
              index={index}
              cover={game.coverUrl}
              title={game.title}
              publishDate={String(game.publishDate)}
              description={game.description}
              ageRating={game.ageRating}
            />
          </li>
        ))}
      </ul>
      <ul
        className={`flex items-center justify-center md:justify-start lg:[&_li]:mx-16 md:[&_li]:mx-12 [&_li]:mx-8 [&_img]:max-w-none ${
          reverse
            ? `animate-infinite-scroll-reverse`
            : `animate-infinite-scroll`
        }`}
        aria-hidden="true"
      >
        {list.map((game, index) => (
          <li
            key={index}
            className="inline-flex flex-none mx-5 drop-shadow-[0_0px_10px_rgba(96,43,83,2)] dark:drop-shadow-[0_0px_10px_rgba(237,189,104,2)]"
          >
            <GameCard
              index={index}
              cover={game.coverUrl}
              title={game.title}
              publishDate={game.publishDate}
              description={game.description}
              ageRating={game.ageRating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;
