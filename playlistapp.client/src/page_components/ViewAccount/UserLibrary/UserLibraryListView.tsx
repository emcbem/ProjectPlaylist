import { UserGame } from "@/@types/usergame";
import { FC } from "react";

interface MyLibraryGridViewProps {
  games: UserGame[];
}

const UserLibraryListView: FC<MyLibraryGridViewProps> = ({ games }) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3  xl:block lg:block md:block sm:hidden xs:hidden hidden"
              ></th>
              <th scope="col" className="px-6 py-3">
                Title
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={key}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  xl:block lg:block md:block sm:hidden xs:hidden hidden"
                >
                  <img
                    src={g.platformGame.game.coverUrl}
                    width={70}
                    className="hover:scale-105"
                  />
                </th>
                <td className="px-6 py-4">{g.platformGame.game.title}</td>
                <td className="px-6 py-4">
                  {new Date(g.platformGame.game.publishDate).toDateString()}
                </td>
                <td className="px-6 py-4">{String(g.dateAdded)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserLibraryListView;
