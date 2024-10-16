import { Game } from '@/@types/game';
import { FC } from 'react'
import { Link } from 'react-router-dom';

interface CardGamesListProps {
    games: Game[];
}

const CardGamesList: FC<CardGamesListProps> = ({ games }) => {
    return (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
            {games.map((g, key) => (
                <div key={key} className="w-50 rounded border-2 border-[#111111] grid grid-cols-5 m-5 dark:border-[#ffffff]">
                    <div className="w-full h-full col-span-2">
                        <img className="img img-fluid lg:w-40 lg:h-50 sm:w-40 sm:h-48 w-24 h-40 object-cover" src={g.coverUrl} />
                    </div>
                    <div className="relative w-full h-full col-span-3 p-2">
                        <Link to={`/view-game/${g.id}`}>
                            <p className="text-2xl text-blue-600">{g.title}</p>
                        </Link>
                        <div className="absolute bottom-2 left-2 flex flex-wrap">
                            <div className="me-2">
                                {/* Icons */}
                            </div>
                        </div>
                        {/* <div className="absolute bottom-2 right-2 flex flex-wrap bg-gray-300 p-1 rounded-full d-none">
                            <div id="dropdownDefaultButton" onClick={(event) => {
                                event.stopPropagation();
                                setdropDownIsVisible(!dropDownIsVisible);
                            }} className="p-3 hover:scale-110">
                                <PlusIcon width={"20"} height={"20"} />
                            </div>
                            <div id="dropdown" className={`${dropDownIsVisible ? `absolute mt-8` : `hidden`} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Library</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Wish List</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My List</a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardGamesList