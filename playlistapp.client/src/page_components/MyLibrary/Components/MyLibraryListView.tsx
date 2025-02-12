import { UserGame } from "@/@types/usergame";
import { FC } from "react";
import formatDate from "@/lib/date.ts";
import { useNavigate } from "react-router-dom";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const MyLibraryListView: FC<MyLibraryGridViewProps> = ({ games }) => {
  const navigate = useNavigate();

  const handleRowClick = (userGameId: number) => {
    navigate(`/user-library-game/${userGameId}`);
  };
  return (
    <>
      <div className="relative overflow-x-auto sm:m-2 rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-clay-900 dark:text-clay-950">
          <thead className="text-xs text-clay-950 uppercase bg-clay-400 dark:text-clay-950">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Platform
              </th>
              <th scope="col" className="px-6 py-3">
                Publish Date
              </th>
              <th scope="col" className="px-6 py-3">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((g, key) => (
              <tr
                className="bg-[#f1f3f4] border-b dark:bg-clay-200 dark:border-clay-600 dark:hover:bg-clay-100 hover:bg-clay-950 hover:cursor-pointer transition-all text-black dark:text-white"
                key={key}
                onClick={() => handleRowClick(g.userGameId)}
              >
                <td className="px-6 py-4">{g.platformGame.game.title}</td>
                <td className="px-6 py-4">{g.platformGame.platform.name}</td>
                <td className="px-6 py-4">
                  {formatDate(g.platformGame.game.publishDate)}
                </td>
                <td className="px-6 py-4">{formatDate(g.dateAdded)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyLibraryListView;
