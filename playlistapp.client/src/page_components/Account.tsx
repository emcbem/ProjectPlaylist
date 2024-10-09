import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import HorizontalRule from '../individual_components/HorizontalRule';
import { UserGameContext } from '../contexts/UserGameContext';
import { UserGameContextInterface } from '../@types/usergame';

const Account = () => {
    const { userGamesFromUser, isLoading, error } = React.useContext(UserGameContext) as UserGameContextInterface;

    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated &&
        user && (
            <div className="min-h-screen bg-white dark:bg-black dark:text-white">
                <div className="m-8">
                    <div className="text-4xl">Welcome Back, {user.nickname}</div>
                    <HorizontalRule />
                    <div className="flex flex-wrap">
                        <img className="rounded-full" src={user.picture} />
                        <p className="text-4xl ms-8">Lvl 100</p>
                    </div>
                    <p className="mt-8 text-6xl">Your Collection</p>
                    <HorizontalRule />
                    {
                        isLoading && <div className="hover:animate-spin">
                        Loading
                      </div>
                    }

                    {!isLoading && userGamesFromUser &&
                        userGamesFromUser.map((ug, key) =>
                            <div key={key}>
                                <img src={ug.platformGame.game.coverUrl} width={100} />
                                <p>Platform Game Id: {ug.platformGame.game.coverUrl}</p>
                                <p>Time Played: {ug.timePlayed}</p>
                            </div>
                        )
                    }

                    { error && <p>Error: {error}</p>}
                </div>
            </div>
        )
    )
}

export default Account