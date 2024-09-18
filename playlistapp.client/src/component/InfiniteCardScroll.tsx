import React, { useEffect, useRef, useState } from "react";
import { Game } from "../App";
import GameCard from "./GameCard";

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
      className="w-full h-full bg-white inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,white_0,_black_128px,_black_calc(100%-128px),white_100%)] p-8"
    >
      <ul
        className={`flex items-center justify-center md:justify-start [&_li]:mx-16 [&_img]:max-w-none ${
          reverse
            ? `animate-infinite-scroll-reverse`
            : `animate-infinite-scroll`
        }`}
      >
        {list.map((game, index) => (
          <li key={index} className="inline-flex flex-none mx-5">
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
      {/* Duplicate list for seamless scroll */}
      <ul
        className={`flex items-center justify-center md:justify-start [&_li]:mx-16 [&_img]:max-w-none ${
          reverse
            ? `animate-infinite-scroll-reverse`
            : `animate-infinite-scroll`
        }`}
        aria-hidden="true"
      >
        {list.map((game, index) => (
          <li key={index} className="inline-flex flex-none mx-5">
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
