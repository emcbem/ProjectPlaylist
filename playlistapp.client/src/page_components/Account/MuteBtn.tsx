import { UpdateMuteToggleRequest } from "@/@types/Requests/UpdateRequests/updateMuteToggleRequest";
import { UserAccount } from "@/@types/userAccount";
import NotiOff from "@/assets/Notifications/notiOff";
import NotiOn from "@/assets/Notifications/notiOn";
import { FriendQueries } from "@/queries/FriendQueries";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const MuteBtn = ({ usr, userGuid }: { usr: UserAccount; userGuid: string }) => {
  const queryClient = useQueryClient();
  const { data: enabledFriends } = FriendQueries.GetAllFriendsByNotiQuery(
    userGuid ?? ""
  );

  const [buttonHovered, setButtonHovered] = useState<boolean>();

  const { data: currentUser } = UserAccountQueries.useGetUserById(userGuid!);

  const toggleNotisMutation = FriendQueries.ToggleFriendNotis(userGuid!);

  const handleToggle = (userId: number, friendId: number) => {
    const request: UpdateMuteToggleRequest = {
      friendId,
      userId,
    };

    toggleNotisMutation.mutate({ request });

    queryClient.invalidateQueries({
      queryKey: ["Friend", "GetFriendNotis", userGuid],
    });
  };

  const isNotiEnabled = enabledFriends?.some((friend) => friend.id === usr.id);

  return (
    <div>
      {isNotiEnabled ? (
        <div
          className="w-10 h-10 bg-black dark:bg-white flex justify-center items-center rounded-full cursor-pointer transition-all ml-4 mb-1"
          onClick={() => handleToggle(currentUser?.id!, usr.id)}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {buttonHovered ? <NotiOff width={"30"} /> : <NotiOn width={"30"} />}
        </div>
      ) : (
        <div
          className="w-10 h-10 bg-black dark:bg-white flex justify-center items-center rounded-full cursor-pointer transition-all ml-4 mb-1"
          onClick={() => handleToggle(currentUser?.id!, usr.id)}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {buttonHovered ? <NotiOn width={"30"} /> : <NotiOff width={"30"} />}
        </div>
      )}
    </div>
  );
};

export default MuteBtn;

// className={`text-2xl p-2 border-2 border-black rounded-md cursor-pointer ${
//   isFriend ? "block" : "hidden"
// }`}
