import { UserGame } from "@/@types/usergame";
import { FC } from "react";
import { Link } from "react-router-dom";
import GameCover from "./GameCover";

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
          className="m-2 w-24 sm:w-40"
        >
          <GameCover ug={ug} />
        </Link>
      ))}
    </div>
  );
};

export default MyLibraryGridView;
