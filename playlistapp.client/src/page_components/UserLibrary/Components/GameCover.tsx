import { UserGame } from "@/@types/usergame";
import RemoveFromLibButton from "./Buttons/RemoveButton";
import { GridLogoDictonary } from "./GridLogoDictonary";
import { useParams } from "react-router-dom";

const GameCover = ({ ug }: { ug: UserGame }) => {
  const { id } = useParams<{ id: string }>();

  const Logo =
    GridLogoDictonary[ug.platformGame.platform.id] || (() => <div></div>);

  //   const backgroundImage = theme === "dark" ? `url(${CW})` : `url(${CB})`;

  return (
    <div className="relative group">
      {!id && (
        <div className="absolute bottom-2 left-2">
          <div className="xs:hidden group-hover:block sm:hidden">
            <RemoveFromLibButton ugid={ug.userGameId} />
          </div>
        </div>
      )}

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
