import React, { useState } from 'react'
import { TwitchIconCustom } from '../assets/TwitchLogoCustom';
import { XboxIconCustom } from '../assets/xboxLogoCustom';
import { PlusIcon } from '../assets/plusIcon';
import { Link } from 'react-router-dom';

// interface props {
//     allGames: Game[];
// }

const SearchPage: React.FC = ({ }) => {
    const iconsize = "30";
    const [isVisible, setIsVisible] = useState(false);
    const [dropDownIsVisible, setdropDownIsVisible] = useState(false)
    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };

    const showToggle = () => {
        setdropDownIsVisible(!dropDownIsVisible);
    }
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
                            <div className="rounded-full p-1 px-3 border-2 border-[#111111] m-1 hover:bg-gray-300">Arcade</div>
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

                        <button id="dropdownDefaultButton" onClick={showToggle} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>

                        <div id="dropdown" className={`${dropDownIsVisible ? `block ` : `hidden `} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                            {/* <Link to="/view-game/1"> */}
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5 hover:scale-105">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid "
                                        src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="relative w-full h-full col-span-2 p-2">
                                    <p className="text-xl">Game Title</p>
                                    <p>Producer</p>
                                    <div className="absolute bottom-2 left-2 flex flex-wrap">
                                        <div className="me-2">
                                            <TwitchIconCustom width={iconsize} height={iconsize} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 flex flex-wrap bg-blue-300 p-2 rounded-full">
                                        {/* <Link to="/blahhhh"> */}
                                        <div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" >
                                            <PlusIcon width={"20"} height={"20"} />
                                        </div>
                                        {/* </Link> */}
                                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </Link> */}
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid lg:w-40 sm:w-32 sm:h-48 w-24 h-40 object-cover rounded-lg" src="https://images.igdb.com/igdb/image/upload/t_cover_big/znlm356k9dc2ajz0bafq.jpg" />
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