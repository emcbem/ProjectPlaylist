import { UserPlatform } from "@/@types/userPlatform";
import { FC } from "react";

interface props {
  isVisible: boolean;
  userPlatform: UserPlatform | null;
  userId: string;
}

export const SteamSyncButton: FC<props> = ({
  isVisible,
  userPlatform,
  userId,
}) => {
  const handleAuth = async () => {
    if (userId != undefined) {
      window.location.href = `${import.meta.env.VITE_URL}/Steam/auth/${userId}`;
    }
  };

  return (
    <p
      role="button"
      className={`text-teal-400 underline underline-offset-2 ms-5 ${
        isVisible ? "hidden" : ""
      }  ${!userPlatform ? "hidden" : ""}`}
      onClick={handleAuth}
    >
      Authenticate With Steam
    </p>
  );
};
