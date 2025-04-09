import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import RemoveFriendModal from "./RemoveFriendModal";
import { FriendQueries } from "@/queries/FriendQueries";
import { useModalController } from "../Settings/Hooks/useModalController";

const FriendButton = ({
  userGuid,
  userId,
  friendId,
}: {
  userGuid: string;
  userId: number;
  friendId: number;
}) => {
  const [friendsHovered, setFriendsHovered] = useState<boolean>();

  const modalController = useModalController({showBottomButtons: false, showTopButtons: false})

  const { mutateAsync } = FriendQueries.RemoveFriend(userGuid);

  const handleRemoveFriend = async () => {
    try {
      await mutateAsync({ userId, friendId });
      modalController.setModalVisibility(false);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <>
      <span
        className="cursor-pointer flex flex-row items-center border-2 text-black dark:text-white rounded-lg py-1 px-2 border-clay-700 dark:border-clay-900 justify-center space-x-1 mt-2"
        onMouseEnter={() => setFriendsHovered(true)}
        onMouseLeave={() => setFriendsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          modalController.setModalVisibility(true);
        }}
      >
        <UserIcon height={18} />
        <span>{friendsHovered ? "Remove" : "Friends"}</span>
      </span>

      <RemoveFriendModal
        modalController={modalController}
        onClose={() => modalController.setModalVisibility(false)}
        onConfirm={handleRemoveFriend}
      />

      
    </>
  );
};

export default FriendButton;
