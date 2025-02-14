import { Game } from "@/@types/game";
import { ViewLogoDictonary } from "./Components/ViewLogoDictonary";

const LibraryGameCover = ({
  game,
  platformId,
}: {
  game: Game;
  platformId: number;
}) => {
  const Logo = ViewLogoDictonary[platformId] || (() => <div></div>);

  return (
    <div className="relative">
      <img
        src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
        className="block aspect-[3/4] max-h-96 object-cover rounded-lg shadow-xl w-full"
        alt={`${game?.title} cover`}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-24 dark:bg-white bg-black clip-corner rounded-br-lg opacity-90 backdrop-blur-md"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}
      ></div>
      <div className="absolute bottom-4 right-6">
        <Logo />
      </div>
    </div>
  );
};

export default LibraryGameCover;
