import { ListGame } from "@/@types/listgame";
import { FC } from "react";
import { List } from "@/@types/list";
import { Link, useParams } from "react-router-dom";
import RemoveFromListButton from "./RemoveListGameButton";

interface props {
  listGames: ListGame[] | undefined;
  list: List | undefined;
}

const PlaylistGridView: FC<props> = ({ listGames, list }) => {
  const { id } = useParams<{ id: string }>();
  if (!listGames || listGames.length <= 0) {
    return (
      <div className="flex items-center justify-center text-center max-w-[300px]">
  <p className="text-lg">
    Looks like we can't find any games in this list (Either add games to
    this list or change your search criteria)
  </p>
</div>

    );
  }

  return (
    <div className="flex flex-wrap">
      {listGames &&
        listGames?.map((listGame, key) => (
          <Link
            key={key}
            to={`/view-game/${listGame.game.id}`}
            className="m-2 w-36"
          >
            <div className="relative group">
              {!id && (
                <div className="absolute bottom-2 left-2">
                  <div className="hidden group-hover:block">
                    <RemoveFromListButton listGame={listGame} list={list} />
                  </div>
                </div>
              )}
              <div className="overflow-hidden">
                <img
                  className="img img-fluid w-full h-auto object-cover rounded-xl"
                  src={listGame.game.coverUrl}
                  style={{ aspectRatio: "3 / 4" }}
                />
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PlaylistGridView;
