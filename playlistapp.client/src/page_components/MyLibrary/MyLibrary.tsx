import { UserGameContextInterface } from '@/@types/usergame';
import { UserGameContext } from '@/contexts/UserGameContext';
import React, { useState } from 'react'
import MyLibraryGridView from './MyLibraryGridView';
import MyLibraryListView from './MyLibraryListView';
import GridAndListIcons from './GridAndListIcons';

const MyLibrary = () => {
    const { userGamesFromUser, isLoading } = React.useContext(UserGameContext) as UserGameContextInterface;
    const [isListView, setIsListView] = useState<boolean>(true);

    if (isLoading) {
        return <>Loading ...</>
    }

    return (
        <div className='min-h-screen bg-white dark:bg-black dark:text-white'>
            <h1 className="text-3xl mt-8">Library</h1>
            <GridAndListIcons isListView={isListView} setIsListView={setIsListView}/>
            
            {isListView ? (
                <MyLibraryGridView games={userGamesFromUser} />
            ) : (
                <MyLibraryListView games={userGamesFromUser} />
            )}
        </div>
    )
}

export default MyLibrary