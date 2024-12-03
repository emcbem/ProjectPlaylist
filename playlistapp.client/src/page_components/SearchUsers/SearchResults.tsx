import { ClockIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import AddFriendBtn from "./AddFriendBtn";
import { useAuth0 } from "@auth0/auth0-react";
import { UserAccount, UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/queries/FriendQueries";
import { Link } from "react-router-dom";

const SearchResults = ({ user }: { user: UserAccount }) => {
  const { isAuthenticated } = useAuth0();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;
  const { data: friends } = FriendQueries.GetAllFriendsByBaseIdQuery(
    usr?.guid ?? ""
  );
  const { data: pendingFriends } = FriendQueries.GetPendingFriendRequestsQuery(
    usr?.id ?? 0
  );
  const isFriend = friends?.some((friend) => friend.id === user.id);
  const isPending = pendingFriends?.some(
    (pendingFriend) => pendingFriend.receivingUser.id === user.id
  );
  return (
    <>
      <Link
        className="rounded-lg mt-3 flex flex-row align-middle items-center justify-between p-5 w-50 hover:scale-105 transition-all shadow-lg dark:bg-clay-100 md:m-5 my-2 shadow-pporange-100 dark:shadow-pppurple-600 dark:hover:shadow-pporange-700 duration-300 bg-stone-50 cursor-pointer"
        to={`/user/${user.guid}`}
      >
        <div className="flex flex-row">
          <img
            className="rounded-full md:w-24 md:h-24 w-14 h-14 shadow-inner dark:bg-gray-200 bg-clay-600 p-2 md:p-3"
            src={user.profileURL ?? ""}
          />
          <div className="ms-3 flex h-full flex-col mt-3">
            <p className="md:text-xl md:font-semibold">{user.username}</p>

            <p className="text-sm dark:text-clay-950 text-clay-700 font-sans">
              {user.xp ?? "0"} Xp &#x2022; {user.userGames.length} Games
            </p>
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
      </Link>
    </>
  );
};

export default SearchResults;
