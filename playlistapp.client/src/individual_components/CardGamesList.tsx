import { Game } from "@/@types/game";
import { Link } from "react-router-dom";

const ListGame = (g: Game, key: number) => {
  console.log(g)
  return (
    <Link to={`/view-game/${g.id}`}>
      <div
        key={key}
        className="w-50 hover:scale-105 transition-all rounded-lg shadow-lg dark:bg-clay-100 grid grid-cols-12 md:m-5 my-2 shadow-pporange-100 dark:shadow-pppurple-600 dark:hover:shadow-pporange-700 duration-300 bg-stone-50"
      >
        <div className="w-full h-fit col-span-5">
          <img
            className="img img-fluid lg:w-40 lg:h-50 sm:w-40 sm:h-48 w-32 h-40 object-cover rounded-l-lg"
            src={g.coverUrl}
          />
        </div>
        <div className="relative w-full h-fit col-span-7 p-1">
          <p className="md:text-2xl text-xl font-semibold truncate">{g.title}</p>
          {formatDate(g.publishDate).slice(6,)}<br />
          {g.ageRating}
        </div>
      </div>
    </Link>
  );
};

import { forwardRef } from "react";
import formatDate from "@/lib/date";

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
