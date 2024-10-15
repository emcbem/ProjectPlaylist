import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import { Game, GameContextInterface } from '../@types/game';
import CardGamesList from '@/individual_components/CardGamesList';
import { GameQueries } from '@/hooks/GameQueries';

const SearchPage: React.FC = () => {
    const [location] = useState(useLocation());
    const [query] = useState<string>(location.state?.query)

    const [isVisible, setIsVisible] = useState(false);

    const { games, isLoading } = React.useContext(GameContext) as GameContextInterface;
    const { data:gamesByName } = GameQueries.useGetAllGamesByNameQuery(query);
    const [gamesAfterFilter, setgamesAfterFilter] = useState<Game[]>([]);


    // const {data} = useInfiniteQuery({
    //     queryKey: ['games'],
    //     queryFn: GameService.GetAllGames,
    //     initialPageParam: 0,
    //     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    //   })

    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        console.log("search query: ", query)
        if (query) {
            setgamesAfterFilter(gamesByName || []);
        } else {
            setgamesAfterFilter(games);
        }

    }, [query, gamesByName, games])

    if (isLoading) {
        return <div>Loading ...</div>
    }



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
                    <div className="ml-1/4 w-3/4 h-full p-5 overflow-y-auto">
                        <CardGamesList games={gamesAfterFilter} />
                    </div>

                </div>

                <div className={`${isVisible ? 'block' : 'hidden'} absolute top-20 left-0 overflow-y-auto h-screen w-screen bg-black`}>
                    <div className=''>
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
            </div>
        </>
    );
}

export default SearchPage;
