import { Game } from "@/@types/game";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Contour from "@/assets/contour1.svg";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const MasonryCardItem: FC<{ game: Game }> = ({ game }) => {
  const [randomHeight] = useState(
    Math.floor(Math.random() * (300 - 200 + 1) + 200)
  );

  return (
    <Link to={`/view-game/${game.id}`} key={game.id}>
      <div className="rounded-lg overflow-hidden text-black dark:text-white">
        <img
          src={game.coverUrl}
          style={{
            height:
              window.innerWidth >= 640
                ? `${randomHeight}px`
                : `${randomHeight / 2}px`,
          }}
          className="w-full object-cover"
          alt="Game Cover"
        />
        <div
          className="bg-[#f1f3f4] dark:bg-clay-400 pt-3"
        >
          <div className="sm:text-2xl text-base px-2 pt-2 font-extrabold">
            {game.title}
          </div>
          <div className="sm:text-base text-xs px-2 pt-2 ">
            Rating: {game.ageRating}
          </div>
          <div className="sm:text-base text-xs px-2 py-2 ">
            Release:{" "}
            {game.publishDate
              ? new Date(game.publishDate).toLocaleDateString(
                  undefined,
                  options
                )
              : ""}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MasonryCardItem;
