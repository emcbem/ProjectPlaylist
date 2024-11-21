import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/hooks/FriendQueries";
import { UserAccountQueries } from "@/hooks/UserAccountQueries";
import { useSearchBarContext } from "@/hooks/useSearchBarContext";
import { UserIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";
import AddFriendBtn from "./AddFriendBtn";

const SearchUsers = () => {
    const { isAuthenticated } = useAuth0();
    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;

    const searchBarContext = useSearchBarContext();

    const { data: users, isLoading, isError } = UserAccountQueries.useGetUserBySearch(searchBarContext.searchQuery);
    const { data: friends } = FriendQueries.GetAllFriendsByBaseIdQuery(usr?.guid ?? "")
    const { data: pendingFriends } = FriendQueries.GetPendingFriendRequestsQuery(usr?.id ?? 0);
    console.log(pendingFriends)
    console.log("pfriends: ", pendingFriends)

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
                    const isPending = pendingFriends?.some(pendingFriend => pendingFriend.receivingUser.id === user.id)
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
                                {isAuthenticated && (
                                    <div>
                                        {!isFriend && isAuthenticated && usr ? (
                                            <AddFriendBtn baseUserId={usr.guid} recievingUserId={user.guid} />
                                        ) : isPending ? (
                                            <span className="flex flex-row align-bottom text-sm text-clay-700 dark:text-clay-900">
                                                <ClockIcon height={18} />
                                                <p>Pending</p>
                                            </span>
                                        ) : (
                                            <span className="flex flex-row align-bottom text-sm text-clay-700 dark:text-clay-900">
                                                <UserIcon height={18} />
                                                <span className="font-sans">Friends</span>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchUsers