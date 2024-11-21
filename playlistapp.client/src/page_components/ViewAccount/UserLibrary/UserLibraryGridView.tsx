import { UserGame } from "@/@types/usergame";
import { FC } from "react";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const UserLibraryGridView: FC<MyLibraryGridViewProps> = ({ games }) => {
  return (
    <div className="flex flex-wrap">
      {games.map((ug, key) => (
        <div key={key} className="m-2 w-36">
          <div className="relative group">
            <div className="overflow-hidden">
              <img
                className="img img-fluid w-full h-auto object-cover rounded-xl"
                src={ug.platformGame.game.coverUrl}
                style={{ aspectRatio: "3 / 4" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLibraryGridView;
