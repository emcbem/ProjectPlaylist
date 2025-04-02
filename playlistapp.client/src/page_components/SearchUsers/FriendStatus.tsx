import { UserAccount, UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/queries/FriendQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { ClockIcon } from "@heroicons/react/24/outline";
import React from "react";
import AddFriendBtn from "./AddFriendBtn";
import FriendButton from "./FriendButton";

const FriendStatus = ({ user }: { user: UserAccount }) => {
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
  const recievedRequest = pendingFriends?.some(
    (pendingFriend) => pendingFriend.baseUser.id === user.id
  );

  console.log(
    isFriend,
    "isFriend",
    recievedRequest,
    "recievedRequest",
    isAuthenticated,
    "isAuthenticated",
    isPending,
    "isPending",
    recievedRequest,
    "recievedRequest"
  );

  //isFriend: false, recievedRequest: false, isAuthenticated: true => Add Friend
  //isFriend: false, recievedRequest: true, isAuthenticated: true && isPending: true || receivedRequest: true => Pending

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {usr?.guid != user.guid &&
        (!isFriend &&
        !recievedRequest &&
        !isPending &&
        isAuthenticated &&
        usr ? (
          <AddFriendBtn baseUserId={usr.guid} recievingUserId={user.guid} />
        ) : isPending || recievedRequest ? (
          <span className="cursor-pointer flex flex-row items-center border-2 text-black dark:text-white rounded-lg py-1 px-2 border-clay-700 dark:border-clay-900 justify-center space-x-1 mt-2">
            <ClockIcon height={18} />
            <p>Pending</p>
          </span>
        ) : (
          <FriendButton
            userGuid={usr?.guid!}
            userId={usr?.id!}
            friendId={user.id}
          />
        ))}
    </span>
  );
};

export default FriendStatus;
