import React from 'react'
import { SteamIcon } from '../assets/steamLogo';

// interface props {
//     allGames: Game[];
// }

const SearchPage: React.FC = ({ }) => {
    return (
        <>
            <div className="min-h-screen bg-white">

                <p className="text-6xl">Search</p>
                <div className="grid grid grid-cols-4">

                    <div className="col-span-1 w-full h-screen bg-gradient-to-b from-[#ff704e00] to-[#602B53] p-5">
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
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Arcade</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Fighting</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Action</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Shooter</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Puzzle</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Sport</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">MOBA</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Quiz / Trivia</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Pinball</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Indie</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Point-and-click</div>
                            <div className="rounded-full p-1 px-5 border-2 border-[#111111] m-1 hover:bg-gray-300">Simulator</div>
                        </div>
                    </div>

                    <div className="col-span-3 m-5 w-full h-full p-5">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-50 h-full rounded border-2 border-[#111111] grid grid-cols-3 m-5">
                                <div className="w-full h-full col-span-1">
                                    <div className="relative">
                                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp" alt="Description" className="w-full h-auto" />
                                        <div className="absolute bottom-0 right-0 mb-2 mr-2 bg-white rounded-full p-2 shadow-lg">
                                            <SteamIcon width={20}/>
                                        </div>
                                    </div>
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
                                    <div className="rounded-full bg-gray-700 mx-auto">*</div>
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