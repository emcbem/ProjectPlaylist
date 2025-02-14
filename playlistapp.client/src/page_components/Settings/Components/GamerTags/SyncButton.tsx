import { UserPlatform } from "@/@types/userPlatform";
import { useEffect, useState } from "react";
import WarningModal from "./WarningModal";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import { PlaystationDTO } from "@/@types/Playstation/playstationDTO";
import { SteamQueries } from "@/queries/SteamQueries";
import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";
import { ItemAction } from "@/@types/Combination/itemAction";

const SyncButton = ({
  userId,
  accountId,
  userPlatform,
  searched,
  isVisible,
  platformId,
}: {
  userId: string;
  accountId: string;
  userPlatform: UserPlatform | null;
  searched: boolean;
  isVisible: boolean;
  platformId: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionsToShowUser, setActionsToShowUser] = useState<
    ItemAction | undefined
  >();

  // PlayStation
  const user: PlaystationDTO = {
    userId: userId,
    accountId: accountId,
  };

  const {
    data: actionsFromPlaystation,
    mutateAsync: getPlaystationLog,
    isPending,
  } = PlaystationQueries.useOrchestrateInitialPlaystationAccountSync(user);

  // Steam
  const steamActionLogRequest: SteamActionLogRequest = {
    userId: userId,
    userSteamId: accountId,
  };

  const {
    data: actionsFromSteam,
    mutateAsync: steamMutate,
    isPending: steamIsPending,
  } = SteamQueries.useGetSteamActionLog(steamActionLogRequest);

  async function startSync() {
    setIsModalOpen(true);
    if (platformId === 7) {
      setActionsToShowUser(actionsFromPlaystation);
      await getPlaystationLog();
    } else if (platformId === 163) {
      setActionsToShowUser(actionsFromSteam);
      await steamMutate();
    }
  }

  useEffect(() => {
    if (platformId === 7 && actionsFromPlaystation) {
      setActionsToShowUser(actionsFromPlaystation);
    } else if (platformId === 163 && actionsFromSteam) {
      setActionsToShowUser(actionsFromSteam);
    }
  }, [actionsFromPlaystation, actionsFromSteam, platformId]);

  return (
    <>
      <WarningModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
        accountId={accountId}
        actionLog={actionsToShowUser}
        actionLogPending={isPending || steamIsPending}
        platformId={platformId}
      />
      <p
        role="button"
        className={`text-teal-400 underline underline-offset-2 ms-5 ${
          isVisible || searched ? "hidden" : ""
        }  ${!userPlatform ? "hidden" : ""} mt-1`}
        onClick={startSync}
      >
        sync
      </p>
    </>
  );
};

export default SyncButton;
