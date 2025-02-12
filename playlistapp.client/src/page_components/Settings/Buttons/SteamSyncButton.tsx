import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";
import { UserPlatform } from "@/@types/userPlatform";
import { SteamQueries } from "@/queries/SteamQueries";
import { FC, useEffect, useState } from "react";
import WarningModal from "../Components/GamerTags/WarningModal";

export const SteamSyncButton = ({
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

  // const handleAuth = async () => {
  //   if (userId != undefined) {
  //     window.location.href = `${import.meta.env.VITE_URL}/Steam/auth/${userId}`;
  //   }
  // };

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
          isVisible ? "hidden" : ""
        }  ${!userPlatform ? "hidden" : ""}`}
        onClick={handleConfirmation}
      >
        sync games with Steam
      </p>
    </>
  );
};
