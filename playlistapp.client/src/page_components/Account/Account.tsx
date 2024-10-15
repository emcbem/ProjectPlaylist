import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import HorizontalRule from '../../individual_components/HorizontalRule';
import { UserGameContext } from '../../contexts/UserGameContext';
import { UserGameContextInterface } from '../../@types/usergame';
import "./Account.modules.scss"
import { Link } from 'react-router-dom';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { UserAccountContextInterface } from '@/@types/userAccount';
import PlatformGamerTags from './PlatformGamerTags';

const Account = () => {
    const { userGamesFromUser, isLoading } = React.useContext(UserGameContext) as UserGameContextInterface;

    const { user, isAuthenticated } = useAuth0();

    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;

    console.log(usr)

    return (
        isAuthenticated &&
        user && (
            <div className="min-h-screen bg-white dark:bg-black dark:text-white">
                <div className="m-8">
                    <HorizontalRule />
                    <div className="flex flex-wrap">
                        <img className="rounded-full" src={user.picture} />
                        <div>

                            <p className="text-4xl ms-8">{user.nickname}</p>
                            <p className="text-2xl ms-8">{usr?.xp == 0 ? 0 : usr?.xp} Xp</p>
                        </div>
                    </div>

                    <PlatformGamerTags />

                    <p className="mt-8 text-6xl">Your Collection</p>
                    {isLoading &&
                        <div className="relative w-3/4">
                            <div className="flex flex-wrap w-100">
                                <div className="w-1/6 mb-4 h-80 animate-pulse bg-gray-500 m-2"></div>
                                <div className="w-1/6 mb-4 h-80 animate-pulse bg-gray-500 m-2"></div>
                                <div className="w-1/6 mb-4 h-80 animate-pulse bg-gray-500 m-2"></div>
                                <div className="w-1/6 mb-4 h-80 animate-pulse bg-gray-500 m-2"></div>
                                <div className="w-1/6 mb-4 h-80 animate-pulse bg-gray-500 m-2"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-30 flex items-center justify-end customGradient opacity-100 dark:opacity-80 p-5">
                                <p className="text-white text-2xl me-2">Loading ...<br />
                                </p>
                            </div>
                        </div>
                    }


                    <div className="flex flex-wrap relative">
                        {!isLoading && userGamesFromUser &&
                            userGamesFromUser.map((ug, key) => (
                                <div key={key} className="m-2">
                                    <img src={ug.platformGame.game.coverUrl} width={250} className="hover:scale-105" />
                                </div>
                            ))}
                        {!isLoading && userGamesFromUser.length > 0 &&
                            <div className="absolute bottom-0 left-0 right-0 h-30 flex items-center justify-end opacity-100 dark:opacity-80 customGradient p-5">
                                <p className="text-white text-2xl me-2">View All<br />
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </p>
                            </div>
                        }
                    </div>
                    {!isLoading && userGamesFromUser.length <= 0 &&
                        <div className="relative w-3/4">
                            <p>Looks like you don't have any games in your collection. Browse our games and add one!</p>
                            <Link to={'search'} >
                                <div className="h-30 flex items-center justify-end opacity-100 dark:opacity-80 customGradient mt-5 p-5">
                                    <div>
                                        <p className="text-white text-2xl me-2">Add your first game <br />
                                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                            </svg>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    }

                    <p className="mt-8 text-6xl">You Playlists</p>




                    {/* {error && <p>Error: {error}</p>} */}
                </div>
            </div>
        )
    )
}

export default Account