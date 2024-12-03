import { Game } from "@/@types/game";
const GameCover = ({ game }: { game: Game }) => {
  return (
    <img
      src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
      className="lgmd:w-60 lgmd:h-96 sm:h-60 sm:w-36 w-28 h-44 object-cover rounded-lg shadow-xl sticky top-10"
      alt={`${game?.title} cover`}
    />
  );
};

export default GameCover;
