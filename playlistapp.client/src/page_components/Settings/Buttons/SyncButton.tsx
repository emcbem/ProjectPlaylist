import { UserPlatform } from "@/@types/userPlatform";
import { FC } from "react";

interface props {
  isVisible: boolean;
  userPlatform: UserPlatform | null;
}

export const SyncButton: FC<props> = ({ isVisible, userPlatform }) => {
    const handleSync = async () => { };

  return (
    <p
      role="button"
      className={`text-teal-400 underline underline-offset-2 ms-5 ${
        isVisible ? "hidden" : ""
      }  ${!userPlatform ? "hidden" : ""}`}
      onClick={handleSync}
    >
      sync
    </p>
  );
};
