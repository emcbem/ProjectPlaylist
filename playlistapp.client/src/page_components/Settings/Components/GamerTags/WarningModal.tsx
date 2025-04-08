import { ItemAction } from "@/@types/Combination/itemAction";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import React, { useState } from "react";
import Collisions from "../Syncing/Collisions";
import Confirmation from "../Syncing/Confirmation";
import Success from "../Syncing/Success";
import { Modal, ModalController } from "@/components/ui/modal";

const WarningModal = ({
  modalController,
  actionLog,
  actionLogPending,
  platformId,
  startSync,
  setConflicts,
}: {
  modalController: ModalController;
  userId: string;
  accountId: string;
  actionLog: ItemAction[] | undefined;
  actionLogPending: boolean;
  platformId: number;
  startSync: () => void;
  setConflicts: React.Dispatch<React.SetStateAction<ItemAction[] | undefined>>;
}) => {
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const handleRejectSync = (event: React.FormEvent) => {
    event.preventDefault();
    modalController.setModalVisibility(false);
  };

  const handleConfirmation = () => {
    startSync();
  };

  return (
    <>
      <Modal {...modalController}>
        <div className="flex justify-center items-center ">
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
      </Modal>
    </>
  );
};

export default WarningModal;
