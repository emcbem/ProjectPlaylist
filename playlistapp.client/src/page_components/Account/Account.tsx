import React from 'react'
import "./Account.modules.scss"
import { useAuth0 } from '@auth0/auth0-react';
import PlatformGamerTags from './PlatformGamerTags';
import { UserGameContext } from '../../contexts/UserGameContext';
import { UserGameContextInterface } from '../../@types/usergame';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { UserAccountContextInterface } from '@/@types/userAccount';
import HorizontalRule from '../../individual_components/HorizontalRule';
import PlaylistLists from './PlaylistLists';
import loadingDotsGif from '@/assets/LoadingIcons/LoadingDots.gif';
import LibraryLoading from './LibraryViewsComponents/LibraryLoading';
import LibraryList from './LibraryViewsComponents/LibraryList';
import LibraryListNoGames from './LibraryViewsComponents/LibraryListNoGames';


const Account = () => {
    const { userGamesFromUser, isLoading } = React.useContext(UserGameContext) as UserGameContextInterface;
    const { user, isAuthenticated } = useAuth0();
    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;

    return (
        isAuthenticated &&
        user && (
            <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center" >

                <img src={loadingDotsGif} width={20} />
                <div className="m-8 w-full" style={{ maxWidth: "1200px" }}>
                    <HorizontalRule />

                    <div className="flex flex-wrap">
                        <img className="rounded-full" src={user.picture} />
                        <div>
                            <p className="text-4xl ms-8">{user.nickname}</p>
                            <p className="text-2xl ms-8">{usr?.xp == 0 ? 0 : usr?.xp} Xp</p>
                        </div>
                    </div>

                    <PlatformGamerTags />

                    <p className="mt-8 text-6xl">Your Library</p>
                    {isLoading &&
                        <LibraryLoading />
                    }
                    {!isLoading && userGamesFromUser && userGamesFromUser.length > 0 &&
                        <LibraryList userGamesFromUser={userGamesFromUser} />
                    }
                    {!isLoading && userGamesFromUser.length <= 0 &&
                        <LibraryListNoGames />
                    }
                    

                    <p className="mt-8 text-6xl">Your Playlists</p>
                    <PlaylistLists />
                </div>

            </div>
        )
    )
}

export default Account
