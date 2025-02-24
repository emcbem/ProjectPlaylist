import { ItemAction } from "@/@types/Combination/itemAction";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Collisions from "../Syncing/Collisions";
import { FormatCollisions } from "@/hooks/useFormatCollisions";
import Confirmation from "../Syncing/Confirmation";
import Success from "../Syncing/Success";

const WarningModal = ({
  isModalOpen,
  setIsModalOpen,
  actionLog,
  actionLogPending,
  platformId,
  startSync,
}: {
  userId: string;
  accountId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  actionLog: ItemAction | undefined;
  actionLogPending: boolean;
  platformId: number;
  startSync: () => void;
}) => {
  const [syncData, setSyncData] = useState<ItemAction | undefined>(undefined);
  const [conflicts, setConflicts] = useState<ItemAction[]>();
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (actionLog) {
      const reduceList = FormatCollisions(actionLog.itemOptions);
      setSyncData(actionLog);
      setConflicts(reduceList)
    }
  }, [actionLog]);

  const handleRejectSync = (event: React.FormEvent) => {
    event.preventDefault();
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const handleConfirmation = () => {
    startSync();
    console.log("Action log: ", actionLog);
  };
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
          {actionLogPending ? (
            <LoadingDots />
          ) : (
            <form
              onSubmit={handleRejectSync}
              className="flex flex-col gap-4 p-6 mx-5 items-center"
            >
              {!syncData && (
                <Confirmation
                  handleRejectSync={() => handleRejectSync}
                  handleConfirmation={handleConfirmation}
                  platformName={platformId === 7 ? "PlayStation" : "Steam"}
                />
              )}
              {syncData &&
                syncData.itemOptions.length != 0 &&
                hasCompleted != true && (
                  <Collisions
                    syncData={syncData}
                    conflicts={conflicts}
                    hasCompleted={() => setHasCompleted(true)}
                  />
                )}
              {syncData?.itemOptions.length == 0 && <Success />}
              {hasCompleted == true && <Success />}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default WarningModal;
