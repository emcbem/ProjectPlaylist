import { ItemAction } from "@/@types/Combination/itemAction";
import { PlaystationDTO } from "@/@types/Playstation/playstationDTO";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Collisions from "../Syncing/Collisions";
import { FormatCollisions } from "@/hooks/useFormatCollisions";
import Confirmation from "../Syncing/Confirmation";
import Success from "../Syncing/Success";

const WarningModal = ({
  userId,
  accountId,
  isModalOpen,
  setIsModalOpen,
}: {
  userId: string;
  accountId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const [syncData, setSyncData] = useState<ItemAction | undefined>(undefined);

  const user: PlaystationDTO = {
    userId: userId,
    accountId: accountId,
  };
  const { data: orchestrateAccountSync } =
    PlaystationQueries.useOrchestrateInitialPlaystationAccountSync(user);

  const [conflicts, setConflicts] = useState<ItemAction[]>();

  useEffect(() => {
    if (syncData) {
      const reduceList = FormatCollisions(syncData.itemOptions);
      setConflicts(reduceList);
    }
  }, [syncData]);

  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(false);
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
      setLoading(false);
    }
  };

  const handleConfirmation = () => {
    if (orchestrateAccountSync) {
      setSyncData(orchestrateAccountSync);
    }
  };

  console.log(conflicts, "yeah");

  return (
    <>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[10000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-fit min-h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            isModalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5 items-center"
          >
            {loading && <LoadingDots />}
            {!loading && !syncData && (
              <Confirmation
                handleSubmit={() => handleSubmit}
                handleConfirmation={handleConfirmation}
              />
            )}
            {syncData && syncData.itemOptions.length != 0 && (
              <Collisions syncData={syncData} conflicts={conflicts} />
            )}
            {!loading && syncData?.itemOptions.length == 0 && <Success />}
          </form>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
