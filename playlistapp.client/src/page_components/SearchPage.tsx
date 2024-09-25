import React from 'react'
import { Game } from '../App';

// interface props {
//     allGames: Game[];
// }

const SearchPage: React.FC = ({ }) => {
    return (
        <>
            <div className="min-h-screen bg-white">

                <p className="text-6xl">Search</p>
                <div className="grid grid-cols-2">
                    <div className="w-full h-screen bg-gradient-to-b from-[#ffffff] to-[#602B53]">
                        <div className=" grid grid-cols-2 gap-2 mt-5">
                            <div className="rounded-full p-1 border-2">Steam</div>
                            <div className="rounded-full p-1 border-2">Nintendo</div>
                            <div className="rounded-full p-1 border-2">Xbox</div>
                            <div className="rounded-full p-1 border-2">Playstation</div>
                            <div className="rounded-full p-1 border-2">Epic Games</div>
                        </div>
                        
                        <p className="text-2xl mt-5">Filter by Genre</p>
                        <div className="flex flex-wrap">
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Arcade</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Fighting</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Action</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Shooter</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Puzzle</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Sport</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">MOBA</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Quiz / Trivia</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Pinball</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Indie</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Point-and-click</div>
                            <div className="rounded-full p-1 border-2 border-[#1111] m-1 hover:bg-sky-700 hover:text-white">Simulator</div>
                        </div>

       
                    </div>
                    <div className="w-full h-full">


                        <p>COLUMN TWO</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>01</div>
                            <div>02</div>
                            <div>09</div>
                            <div>01</div>
                            <div>02</div>
                            <div>09</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage