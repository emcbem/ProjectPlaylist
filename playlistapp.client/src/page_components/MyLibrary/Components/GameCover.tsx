import { UserGame } from "@/@types/usergame";
import RemoveFromLibButton from "./Buttons/RemoveButton";
import { LogoDictonary } from "./LogoDictonary";
import { useTheme } from "@/hooks/useDarkMode";

const GameCover = ({ ug }: { ug: UserGame }) => {
  const Logo =
    LogoDictonary[ug.platformGame.platform.id] || (() => <div></div>);
  console.log(
    ug.platformGame.platform.id,
    ug.platformGame.platform.name,
    ug.platformGame.game.title,
    "hmmmmmm"
  );
  const { theme } = useTheme();
  //   const backgroundImage = theme === "dark" ? `url(${CW})` : `url(${CB})`;

  return (
    <div className="relative group">
      <div className="absolute bottom-2 left-2">
        <div className="xs:hidden group-hover:block sm:hidden">
          <RemoveFromLibButton ugid={ug.userGameId} />
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-24 h-12 dark:bg-white bg-black clip-corner rounded-br-xl  opacity-90 backdrop-blur-md"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}
      ></div>

      <div className="absolute bottom-2 right-2">
        <Logo />
      </div>

      <div className="overflow-hidden">
        <img
          className="img img-fluid w-full h-auto object-cover rounded-xl"
          src={ug.platformGame.game.coverUrl}
          style={{ aspectRatio: "3 / 4" }}
        />
      </div>
    </div>
  );
};

export default GameCover;
