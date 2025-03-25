import { Friend } from "@/@types/friend";
import { UserAccount } from "@/@types/userAccount";
import { FC } from "react";
import { FilterMyPendingFriends } from "./logic/FilterMyPendingFriends";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FriendQueries } from "@/queries/FriendQueries";
import { AcceptFriendRequest } from "@/@types/Requests/AddRequests/acceptFriendRequest";
import { useQueryClient } from "@tanstack/react-query";

interface PendingFriendsProps {
  pendingFriends: Friend[];
  usr: UserAccount;
}

const PendingFriends: FC<PendingFriendsProps> = ({ pendingFriends, usr }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: AcceptFriendAsync } = FriendQueries.AcceptFriend();

  const handleAcceptFriend = async (friendId: number) => {
    const request: AcceptFriendRequest = {
      friendId: friendId,
      isAccepted: true,
    };

    await AcceptFriendAsync(request);

    queryClient.invalidateQueries({
      queryKey: ["Friend", "GetPendingFriendReqeusts", usr.id],
    });

    queryClient.invalidateQueries({
      queryKey: ["Friend", "GetFriendByBaseId", usr.guid],
    });
  };
  return (
    <div>
      <h2 className="mt-3 text-xl text-gray-500">Pending Requests</h2>
      {FilterMyPendingFriends(pendingFriends, usr.id)?.length ? (
        FilterMyPendingFriends(pendingFriends, usr.id).map((x, key) => (
          <>
            <div
              key={key}
              className="m-3 bg-stone-50 dark:bg-clay-200 rounded-lg px-3 py-2 shadow-xl"
            >
              <div className="flex flex-row justify-between align-middle items-center">
                <p className="mx-3">{x.baseUser.username}</p>
                <div
                  className="cursor-pointer relative flex flex-row items-center dark:text-white dark:bg-clay-600 bg-clay-200 text-white rounded-lg text-start py-1 px-2 justify-center space-x-1"
                  role="button"
                  onClick={() => handleAcceptFriend(x.id)}
                >
                  <UserPlusIcon /> Accept
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PendingFriends;
