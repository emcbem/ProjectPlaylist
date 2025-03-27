import { UserGame } from "@/@types/usergame";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import GameCover from "./GameCover";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const MyLibraryGridView: FC<MyLibraryGridViewProps> = ({ games }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-wrap">
      {games
        .sort((a, b) => (a.platformGame.id < b.platformGame.id ? -1 : 1))
        .map((ug, key) => (
          <Link
            key={key}
            to={
              id
                ? `/user/${id}/user-library-game/${ug.userGameId}`
                : `/user-library-game/${ug.userGameId}`
            }
            className="m-2 w-24 sm:w-40"
          >
            <GameCover ug={ug} />
          </Link>
        ))}
    </div>
  );
};

export default MyLibraryGridView;
