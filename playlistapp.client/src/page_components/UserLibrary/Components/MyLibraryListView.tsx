import { UserGame } from "@/@types/usergame";
import { FC } from "react";
import formatDate from "@/lib/date.ts";
import { useNavigate, useParams } from "react-router-dom";
import RemoveFromLibButton from "./Buttons/RemoveButton";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const MyLibraryListView: FC<MyLibraryGridViewProps> = ({ games }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleRowClick = (gameId: number) => {
    navigate(id ? `/view-game/${gameId}` : `/user-library-game/${gameId}`);
  };
  return (
    <>
      <div className="relative overflow-x-auto sm:m-2 rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-clay-900 dark:text-clay-950">
          <thead className="text-xs text-clay-950 uppercase bg-clay-400 dark:text-clay-950">
            <tr>
              <th
                scope="col"
                className="px-6 py-3  xl:block lg:block md:block sm:hidden xs:hidden hidden"
              ></th>
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
              {!id && <th scope="col" className="px-6 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {games.map((g, key) => (
              <tr
                className="bg-[#f1f3f4] border-b dark:bg-clay-200 dark:border-clay-600 dark:hover:bg-clay-100 hover:bg-clay-950 hover:cursor-pointer transition-all text-black dark:text-white"
                key={key}
                onClick={() =>
                  handleRowClick(id ? g.platformGame.game.id : g.userGameId)
                }
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  xl:block lg:block md:block sm:hidden xs:hidden hidden "
                >
                  <img
                    src={g.platformGame.game.coverUrl}
                    width={70}
                    className="hover:scale-105 rounded-lg"
                  />
                </th>
                <td className="px-6 py-4">{g.platformGame.game.title}</td>
                <td className="px-6 py-4">{g.platformGame.platform.name}</td>
                <td className="px-6 py-4">
                  {formatDate(g.platformGame.game.publishDate)}
                </td>
                <td className="px-6 py-4">{formatDate(g.dateAdded)}</td>
                {!id && (
                  <td className="px-6 py-4">
                    <RemoveFromLibButton ugid={g.userGameId} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyLibraryListView;
