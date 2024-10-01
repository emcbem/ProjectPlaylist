import React, { useState } from 'react'
import { TwitchIconCustom } from '../assets/TwitchLogoCustom';
import { XboxIconCustom } from '../assets/xboxLogoCustom';
import { PlusIcon } from '../assets/plusIcon';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = ({ }) => {
    const iconsize = "30";
    const [isVisible, setIsVisible] = useState(false);
    const [dropDownIsVisible, setdropDownIsVisible] = useState(false)
    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:block m-4">
                    <button className="border border-black dark:border-white dark:text-white p-2 px-8 w-30 h-14 text-2xl rounded-lg" onClick={toggleDiv}>
                        Filter
                    </button>
                </div>

                <div className={`${isVisible ? 'block' : 'hidden'}  absolute bg-red-500`}>
                    <p>Filter Functions! so cool</p>
                </div>


                <div className="grid grid grid-cols-4 relative">

                    <div className="col-span-1 w-full h-screen bg-gradient-to-b from-[#ff704e00] to-[#602B53] p-5 xl:block lg:block md:block hidden">
                        <p className="text-xl mt-5 mb-1">Filter by Platform</p>
                        <div className="flex flex-wrap">
                            <div className="rounded-full p-1 px-5 border-[#111111] m-1 border-2 hover:bg-gray-300">Steam</div>
                            <div className="rounded-full p-1 px-5 border-[#111111] m-1 border-2 hover:bg-gray-300">Nintendo</div>
                            <div className="rounded-full p-1 px-5 border-[#111111] m-1 border-2 hover:bg-gray-300">Xbox</div>
                            <div className="rounded-full p-1 px-5 border-[#111111] m-1 border-2 hover:bg-gray-300">Playstation</div>
                            <div className="rounded-full p-1 px-5 border-[#111111] m-1 border-2 hover:bg-gray-300">Epic Games</div>
                        </div>

                        <p className="text-xl mt-5 mb-1">Filter by Genre</p>
                        <div className="flex flex-wrap">
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-black-300">Arcade</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Fighting</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Action</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Shooter</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Puzzle</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Sport</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">MOBA</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Quiz / Trivia</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Pinball</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Indie</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Point-and-click</div>
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Simulator</div>
                        </div>
                    </div>


                    <div className="col-span-3 m-5 w-full h-full p-5">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-5 m-5 ">
                                <div className="w-full h-full col-span-2">
                                    <img className="img img-fluid lg:w-40 lg:h-64 sm:w-32 sm:h-48 w-24 h-40 object-cover"
                                        src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="relative w-full h-full col-span-3 p-2">
                                    <Link to="/view-game/1">
                                        <p className="text-2xl text-blue-600">Game Title</p>
                                    </Link>
                                    <p>Nintendo</p>
                                    <div className="absolute bottom-2 left-2 flex flex-wrap">
                                        <div className="me-2">
                                            <TwitchIconCustom width={iconsize} height={iconsize} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 flex flex-wrap bg-gray-300 p-1 rounded-full">
                                        <div id="dropdownDefaultButton" onClick={(event) => {
                                            event.stopPropagation();
                                            setdropDownIsVisible(!dropDownIsVisible);
                                        }} data-dropdown-toggle="dropdown" className="p-3 hover:scale-110">
                                            <PlusIcon width={"20"} height={"20"} />
                                        </div>
                                        <div id="dropdown" className={`${dropDownIsVisible ? `absolute mt-8` : `hidden `} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Library</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Wish List</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid lg:w-40 lg:h-64 sm:w-32 sm:h-48 w-24 h-40 object-cover" src="https://images.igdb.com/igdb/image/upload/t_cover_big/znlm356k9dc2ajz0bafq.jpg" />
                                </div>
                                <div className="relative w-full h-full col-span-1">
                                    <p className="text-xl">Game Title <span className="text-gray-500 text-sm">(1996)</span></p>
                                    <p>Producer</p>
                                    <div className="absolute bottom-2 left-2 flex flex-wrap">
                                        <div className="me-2"><XboxIconCustom width={iconsize} height={iconsize} /></div>
                                        <div className="me-2"><XboxIconCustom width={iconsize} height={iconsize} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="w-full h-full col-span-2 p-2">
                                    <p className="text-xl">Game Title</p>
                                    <p>Producer</p>
                                </div>
                            </div>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="w-full h-full col-span-2 p-2">
                                    <p className="text-xl">Game Title</p>
                                    <p>Producer</p>
                                </div>
                            </div>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="w-full h-full col-span-2 p-2">
                                    <p className="text-xl">Game Title</p>
                                    <p>Producer</p>
                                </div>
                            </div>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="w-full h-full col-span-2 p-2">
                                    <p className="text-xl">Game Title</p>
                                    <p>Producer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchPage