import { ListGame } from '@/@types/listgame';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import { List } from '@/@types/list';

interface listViewProps {
    games: ListGame[] | undefined;
    list: List | undefined;
}

const PlaylistTableView: FC<listViewProps> = ({ games }) => {

    if (!games) {
        return <div>Looks like you don't have any games yet...</div>
    }
    return (
        <>
            <div className="relative overflow-x-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 xl:block lg:block md:block sm:hidden xs:hidden hidden">
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Publish Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Added
                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((listGame, key) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={key}>
                                <Link key={key} to={`/user-library-game/${listGame.game.id}`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white xl:block lg:block md:block sm:hidden xs:hidden hidden">
                                        <img src={listGame.game.coverUrl} width={70} className="hover:scale-105" />
                                    </th>
                                </Link>
                                <td className="px-6 py-4">
                                    <Link key={key} to={`/user-library-game/${listGame.game.id}`}>
                                        {listGame.game.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link key={key} to={`/user-library-game/${listGame.game.id}`}>
                                        {listGame.game.publishDate.match(/^(\d{4})/)[1]}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    {String(listGame.dateAdded.getDay)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default PlaylistTableView