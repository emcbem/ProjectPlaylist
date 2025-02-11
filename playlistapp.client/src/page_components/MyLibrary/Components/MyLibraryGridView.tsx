import { UserGame } from "@/@types/usergame";
import { FC } from "react";
import { Link } from "react-router-dom";
import RemoveFromLibButton from "./Buttons/RemoveButton";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const MyLibraryGridView: FC<MyLibraryGridViewProps> = ({ games }) => {
  return (
    <div className="flex flex-wrap">
      {games.map((ug, key) => (
        <Link
          key={key}
          to={`/user-library-game/${ug.userGameId}`}
          className="m-2 w-24 sm:w-36"
        >
          <div className="relative group">
            <div className="absolute bottom-2 left-2">
              <div className="xs:hidden group-hover:block sm:hidden">
                <RemoveFromLibButton ugid={ug.userGameId} />
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                className="img img-fluid w-full h-auto object-cover rounded-xl"
                src={ug.platformGame.game.coverUrl}
                style={{ aspectRatio: "3 / 4" }}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyLibraryGridView;
