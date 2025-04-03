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
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))] gap-3">
      {games.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No games match that criteria
        </div>
      ) : (
        games.map((ug, key) => (
          <Link
            key={key}
            to={
              id
                ? `/user/${id}/user-library-game/${ug.userGameId}`
                : `/user-library-game/${ug.userGameId}`
            }
            className="m-2"
          >
            <GameCover ug={ug} />
          </Link>
        ))
      )}
    </div>
  );
};

export default MyLibraryGridView;
