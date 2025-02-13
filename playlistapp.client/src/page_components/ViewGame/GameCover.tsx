import { Game } from "@/@types/game";
const GameCover = ({ game }: { game: Game }) => {
  return (
    <img
      src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
      className="block aspect-[3/4] max-h-96 object-cover rounded-lg shadow-xl dark:shadow-[#182225]"
      alt={`${game?.title} cover`}
    />
  );
};

export default GameCover;
