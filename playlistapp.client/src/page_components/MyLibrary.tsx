import { UserGameContextInterface } from '@/@types/usergame';
import { UserGameContext } from '@/contexts/UserGameContext';
import React from 'react'

const MyLibrary = () => {
    const { userGamesFromUser, isLoading } = React.useContext(UserGameContext) as UserGameContextInterface;

    if (isLoading) {
        return <>Loading ...</>
    }

    return (
        <div className='min-h-screen bg-white dark:bg-black dark:text-white'>
            <h1 className="text-3xl mt-8">Library</h1>
            <div className="flex flex-wrap relative">
                {userGamesFromUser.map((ug, key) => (
                    <div key={key} className="m-2">
                        <img src={ug.platformGame.game.coverUrl} width={250} className="hover:scale-105" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyLibrary