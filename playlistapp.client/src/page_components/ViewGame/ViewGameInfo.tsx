import { Game } from "@/@types/game";
import formatDate from "@/lib/date";
import { AverageReview } from "./AverageReview";

const ViewGameInfo = ({ game }: { game: Game }) => {
  return (
    <>
      <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl sm:text-2xl text-base">
        {game?.title}
      </h1>
      <p className="text-clay-950 dark:text-clay-900">
        {game?.companies[0].name} -&nbsp;Released&nbsp;
        {game?.publishDate
          ? formatDate(new Date(game.publishDate))
          : "No publish date"}
      </p>
      <div className="flex flex-row text-clay-950 dark:text-clay-900">
        {game?.genres.map((genre, i) =>
          i < game.genres.length - 1 ? `${genre.name}, ` : genre.name
        )}
      </div>
      <AverageReview game={game} />
      <h1 className="dark:text-white text-black sm:text-base text-tiny line-clamp-3">
        {game?.description}
      </h1>
    </>
  );
};
export default ViewGameInfo;
