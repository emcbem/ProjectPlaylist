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
  const [playstationSync, setPlaystationSync] = useState(false);
  const [steamSync, setSteamSync] = useState(false);

  // PlayStation
  const user: PlaystationDTO = {
    userId: userId,
    accountId: accountId,
  };

  const { data: actionsFromPlaystation, isPending } =
    PlaystationQueries.useOrchestrateInitialPlaystationAccountSync(
      user,
      playstationSync
    );

  // Steam
  const steamActionLogRequest: SteamActionLogRequest = {
    userId: userId,
    userSteamId: accountId,
  };

  const { data: actionsFromSteam, isPending: steamIsPending } =
    SteamQueries.useGetSteamActionLog(steamActionLogRequest, steamSync);

  async function startSync() {
    if (platformId === 7) {
      setActionsToShowUser(actionsFromPlaystation);
      setPlaystationSync(true);
    } else if (platformId === 163) {
      setActionsToShowUser(actionsFromSteam);
      setSteamSync(true);
    }
  }

  useEffect(() => {
    if (platformId === 7 && actionsFromPlaystation) {
      setActionsToShowUser(actionsFromPlaystation);
    } else if (platformId === 163 && actionsFromSteam) {
      setActionsToShowUser(actionsFromSteam);
    }
  }, [actionsFromPlaystation, actionsFromSteam, platformId]);
  console.log(isPending);
  console.log(steamIsPending);

  return (
    <>
      <WarningModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
        accountId={accountId}
        actionLog={actionsToShowUser}
        actionLogPending={
          (steamSync && steamIsPending) || (playstationSync && isPending)
        }
        platformId={platformId}
        startSync={startSync}
      />
      <p
        role="button"
        className={`text-teal-400 underline underline-offset-2 ms-5 ${
          isVisible || searched ? "hidden" : ""
        }  ${!userPlatform ? "hidden" : ""} mt-1`}
        onClick={() => setIsModalOpen(true)}
      >
        sync
      </p>
    </>
  );
};

export default SyncButton;
