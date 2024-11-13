import { Game } from "@/@types/game";
import { Link } from "react-router-dom";

const ListGame = (g: Game, key: number) => {
  return (
    <div
      key={key}
      className="w-50 rounded border-2 border-[#111111] grid grid-cols-5 m-5 dark:border-[#ffffff]"
    >
      <div className="w-full h-fit col-span-2">
        <img
          className="img img-fluid lg:w-40 lg:h-50 sm:w-40 sm:h-48 w-24 h-40 object-cover"
          src={g.coverUrl}
        />
      </div>
      <div className="relative w-full h-fit col-span-3 p-2">
        <Link to={`/view-game/${g.id}`}>
          <p className="text-2xl text-blue-600">{g.title}</p>
        </Link>
        <div className="absolute bottom-2 left-2 flex flex-wrap">
          <div className="me-2">{/* Icons */}</div>
        </div>
      </div>
    </div>
  );
};

import { forwardRef } from "react";

const CardGamesList = forwardRef<HTMLDivElement, { games: Game[] }>(
  ({ games }, ref) => {
    return (
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-2">
        {games.map((g, key) => {
          if (key === games.length - 1) {
            return (
              <div ref={ref} key={g.id}>
                {ListGame(g, key)}
              </div>
            );
          } else {
          return <div key={g.id}>{ListGame(g, key)}</div>;
          }
        })}
      </div>
    );
  }
);

export default CardGamesList;
