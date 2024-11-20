import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/hooks/FriendQueries";
import { UserAccountQueries } from "@/hooks/UserAccountQueries";
import { useSearchBarContext } from "@/hooks/useSearchBarContext";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

const SearchUsers = () => {
    const { isAuthenticated } = useAuth0();
    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;

    const searchBarContext = useSearchBarContext();

    const { data: users, isLoading, isError } = UserAccountQueries.useGetUserBySearch(searchBarContext.searchQuery);
    const { data: friends } = FriendQueries.GetAllFriendsByBaseIdQuery(usr?.guid ?? "")
    console.log("friends: ", friends)

    if (isLoading && !isError && searchBarContext.searchQuery.length > 0) {
        return (
            <div className="grid justify-items-center"><p>Loading...</p></div>
        )
    }

    if (isError) {
        return <div className="grid justify-items-center"><p>Something went wrong...</p></div>
    }

    if (Array.isArray(users) && users.length > 0 && searchBarContext.searchQuery.length > 0) {
        const firstUser = users[0];
        if (!firstUser.username || firstUser.username === "") {
            return <div className="grid justify-items-center"><p>No users match your search.</p></div>
        }
    } else {
        return (
            <div className="grid justify-items-center">
                <p>No users found with username {searchBarContext.searchQuery}</p>
            </div>
        );
    }

    return (
        <div className="grid justify-items-center">
            <div style={{ maxWidth: "600px" }} className="w-full mt-8">
                {users && users.map((user, key) => {
                    const isFriend = friends?.some(friend => friend.id === user.id)
                    return (
                        <>
                            <div key={key} className=" rounded-lg md:m-3 mt-3 flex flex-row align-middle items-center justify-between p-1">
                                <div className="flex flex-row">
                                    <img
                                        className="rounded-full md:w-24 md:h-24 w-14 h-14 shadow-inner bg-gray-200 p-2 md:p-3"
                                        src={user.profileURL ?? ""}
                                    />
                                    <div className="ms-3 flex h-full flex-col mt-3">
                                        <p className="md:text-xl md:font-semibold">{user.username}</p>

                                        <p className="text-sm dark:text-clay-950 text-clay-700 font-sans">{user.xp ?? "0"} Xp &#x2022; {user.userGames.length} Games</p>
                                    </div>
                                </div>
                                {isAuthenticated &&
                                    <div>
                                        {!isFriend && isAuthenticated ? (
                                            <div
                                                className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start py-1 px-2  justify-center space-x-1 mt-2"
                                                role="button">
                                                <UserPlusIcon /> Friend
                                            </div>
                                        ) : (
                                            <span className="flex flex-row align-bottom text-sm text-clay-700 dark:text-clay-900">
                                                <UserIcon height={18} />
                                                <span className="font-sans">Friends</span>
                                            </span>
                                        )
                                        }
                                    </div>
                                }
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchUsers