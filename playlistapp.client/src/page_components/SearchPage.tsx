import React, { useState } from 'react';
import { TwitchIconCustom } from '../assets/TwitchLogoCustom';
import { PlusIcon } from '../assets/plusIcon';
import { Link, useLocation } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import { GameContextInterface } from '../@types/game';

const SearchPage: React.FC = () => {
    const iconsize = "30";
    const [isVisible, setIsVisible] = useState(false);
    const [dropDownIsVisible, setdropDownIsVisible] = useState(false);
    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };

    const location = useLocation();
    const query = location.state?.query;

    console.log("search query: ", query)

    const { games } = React.useContext(GameContext) as GameContextInterface;

    return (
        <>
            <div className="relative">
                <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:block">
                    {!isVisible ? (
                        <button className="border border-black dark:border-white dark:text-white p-2 px-8 w-30 h-14 text-2xl rounded-lg" onClick={toggleDiv}>
                            Filter
                        </button>) : (
                        <div className="flex w-screen">
                            <button className="dark:text-white p-2 text-2xl rounded-lg" onClick={toggleDiv}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                            <button className="border border-black dark:border-white dark:text-white p-2 px-8 w-30 h-14 text-2xl rounded-lg justify-self-end">
                                Clear All
                            </button>
                        </div>
                    )
                    }
                </div>


                <div className="min-h-screen bg-white dark:bg-black flex">
                    <div className="w-1/4 h-screen bg-gradient-to-b from-[#ff704e00] to-[#602B53] p-5 sticky top-0 left-0 overflow-y-auto xl:block lg:block md:block sm:hidden xs:hidden hidden">

                        <p className="text-xl mt-5 mb-1">Filter by Platform</p>
                        <div className="flex flex-wrap">
                            {["Steam", "Nintendo", "Xbox", "Playstation", "Epic Games"].map(platform => (
                                <div key={platform} className="rounded-full p-1 px-5 border-[#111111] dark:border-[#ffffff] m-1 border-2 hover:bg-gray-300 dark:hover:bg-red-500">{platform}</div>
                            ))}
                        </div>

                        <p className="text-xl mt-5 mb-1">Filter by Genre</p>
                        <div className="flex flex-wrap">
                            {["Arcade", "Fighting", "Action", "Shooter", "Puzzle", "Sport", "MOBA", "Quiz / Trivia", "Pinball", "Indie", "Point-and-click", "Simulator"].map(genre => (
                                <div key={genre} className="rounded-full p-1 px-3 border-2 border-[#111111] dark:border-[#ffffff] m-1 hover:bg-gray-300">{genre}</div>
                            ))}
                        </div>
                    </div>

                    {/* Game Display Section */}
                    <div className="ml-1/4 w-3/4 h-full p-5 overflow-y-auto">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
                            {games.map((g, key) => (
                                <div key={key} className="w-50 rounded border-2 border-[#111111] grid grid-cols-5 m-5 dark:border-[#ffffff]">
                                    <div className="w-full h-full col-span-2">
                                        <img className="img img-fluid lg:w-40 lg:h-64 sm:w-32 sm:h-48 w-24 h-40 object-cover" src={g.coverUrl} />
                                    </div>
                                    <div className="relative w-full h-full col-span-3 p-2">
                                        <Link to={`/view-game/${g.id}`}>
                                            <p className="text-2xl text-blue-600">{g.title}</p>
                                        </Link>
                                        <div className="absolute bottom-2 left-2 flex flex-wrap">
                                            <div className="me-2">
                                                <TwitchIconCustom width={iconsize} height={iconsize} />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 flex flex-wrap bg-gray-300 p-1 rounded-full d-none">
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`${isVisible ? 'block' : 'hidden'} absolute top-20 left-0 overflow-y-auto h-screen w-screen bg-black`}>
                    <p className="text-xl mt-5 mb-3">Filter by Platform</p>
                    <div className="flex flex-wrap">
                        {["Steam", "Nintendo", "Xbox", "Playstation", "Epic Games"].map(platform => (
                            <div key={platform} className="rounded-full p-3 px-7 border-[#111111] dark:border-[#ffffff] m-2 border-2 hover:bg-gray-300 dark:hover:bg-red-500">{platform}</div>
                        ))}
                    </div>

                    <p className="text-xl mt-5 mb-1">Filter by Genre</p>
                    <div className="flex flex-wrap">
                        {["Arcade", "Fighting", "Action", "Shooter", "Puzzle", "Sport", "MOBA", "Quiz / Trivia", "Pinball", "Indie", "Point-and-click", "Simulator"].map(genre => (
                            <div key={genre} className="rounded-full p-3 px-7 border-2 border-[#111111] dark:border-[#ffffff] m-2 hover:bg-gray-300">{genre}</div>
                        ))}
                    </div>
                    <button className="border border-black dark:border-white dark:text-black p-2 px-8 w-30 h-14 text-2xl rounded-lg sticky bottom-0 dark:bg-white w-screen" onClick={toggleDiv}>
                        Apply Filter
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
