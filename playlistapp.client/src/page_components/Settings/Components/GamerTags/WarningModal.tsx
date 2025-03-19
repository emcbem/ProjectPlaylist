import { ItemAction } from "@/@types/Combination/itemAction";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import React, { useState } from "react";
import { useRef } from "react";
import Collisions from "../Syncing/Collisions";
import Confirmation from "../Syncing/Confirmation";
import Success from "../Syncing/Success";

const WarningModal = ({
  isModalOpen,
  setIsModalOpen,
  actionLog,
  actionLogPending,
  platformId,
  startSync,
  setConflicts,
}: {
  userId: string;
  accountId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  actionLog: ItemAction[] | undefined;
  actionLogPending: boolean;
  platformId: number;
  startSync: () => void;
  setConflicts: React.Dispatch<React.SetStateAction<ItemAction[] | undefined>>;
}) => {
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              {!actionLog && (
                <Confirmation
                  handleRejectSync={() => handleRejectSync}
                  handleConfirmation={handleConfirmation}
                  platformName={platformId === 7 ? "PlayStation" : "Steam"}
                />
              )}
              {actionLog && actionLog.length != 0 && hasCompleted != true && (
                <Collisions
                  conflicts={actionLog}
                  setConflicts={setConflicts}
                  hasCompleted={() => setHasCompleted(true)}
                />
              )}
              {actionLog?.length == 0 && <Success />}
              {hasCompleted == true && <Success />}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default WarningModal;
