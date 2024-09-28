import React, { useState } from 'react'
import { TwitchIconCustom } from '../assets/twitchLogoCustom';
import { XboxIconCustom } from '../assets/xboxLogoCustom';
import { PlusIcon } from '../assets/plusIcon';
import { Link } from 'react-router-dom';

// interface props {
//     allGames: Game[];
// }

const SearchPage: React.FC = ({ }) => {
    const iconsize = "30";
    const [isVisible, setIsVisible] = useState(false);
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
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                            <Link to="/view-game/1">
                                <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                    <div className="w-full h-full col-span-1">
                                        <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                    </div>
                                    <div className="relative w-full h-full col-span-2 p-2">
                                        <p className="text-xl">Game Title</p>
                                        <p>Producer</p>
                                        <div className="absolute bottom-2 left-2 flex flex-wrap">
                                            <div className="me-2"><TwitchIconCustom width={iconsize} height={iconsize} /></div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 flex flex-wrap bg-blue-300 p-2 rounded-full">
                                            <Link to="/blahhhh"><PlusIcon width={"20"} height={"20"} /></Link>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="w-50 rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <img className="img img-fluid" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" />
                                </div>
                                <div className="relative w-full h-full col-span-1">
                                    <p className="text-xl">Game Title</p>
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