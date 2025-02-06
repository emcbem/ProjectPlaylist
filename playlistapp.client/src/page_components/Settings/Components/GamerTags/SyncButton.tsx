import { UserPlatform } from "@/@types/userPlatform";
import { useState } from "react";
import WarningModal from "./WarningModal";

const SyncButton = ({
  userId,
  accountId,
  userPlatform,
  searched,
  isVisible,
}: {
  userId: string;
  accountId: string;
  userPlatform: UserPlatform | null;
  searched: boolean;
  isVisible: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleConfirmation() {
    setIsModalOpen(true);
  }

  return (
    <>
      <WarningModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
        accountId={accountId}
      />
      <p
        role="button"
        className={`text-teal-400 underline underline-offset-2 ms-5 ${
          isVisible || searched ? "hidden" : ""
        }  ${!userPlatform ? "hidden" : ""} mt-1`}
        onClick={handleConfirmation}
      >
        sync
      </p>
    </>
  );
};

export default SyncButton;
