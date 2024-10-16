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
    const { data: gamesByName } = GameQueries.useGetAllGamesByNameQuery(query);
    const [gamesAfterFilter, setgamesAfterFilter] = useState<Game[]>([]);


    // const {data} = useInfiniteQuery({
    //     queryKey: ['games'],
    //     queryFn: GameService.GetAllGames,
    //     initialPageParam: 0,
    //     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    //   })

    const slicedArray = games.filter((item) => !!item.coverUrl);
    const slicedArrayFiltered = gamesByName?.filter((item) => !!item.coverUrl);

    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        console.log("search query: ", query)
        if (query) {
            setgamesAfterFilter(slicedArrayFiltered || []);
        } else {
            setgamesAfterFilter(slicedArray);
        }

    }, [query, gamesByName, games])

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

                    <div className="ml-1/4 w-3/4 sm:w-full h-full p-5 overflow-y-auto">
                        {isLoading && (
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        <CardGamesList games={gamesAfterFilter} />
                        {gamesAfterFilter.length == 0 && !isLoading && (
                            <div className="text-xl m-6">No games matched your search {query}</div>
                        )}
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
