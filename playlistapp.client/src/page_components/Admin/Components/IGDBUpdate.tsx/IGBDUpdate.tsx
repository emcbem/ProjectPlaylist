import { useEffect, useState } from "react";
import Button from "../Button";
import { IGDBSyncQueries } from "@/queries/IGDBSyncQueries";
import "./ProgressBar.css";
import { SuccessPage } from "./SuccessPage";
import { ConfirmationPage } from "./ConfirmationPage";
import { SyncingPage } from "./SyncingPage";
import { useModalController } from "@/page_components/Settings/Hooks/useModalController";
import { Modal } from "@/components/ui/modal";

const IGBDUpdate = () => {
  const [progress, setProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const queries = [
    IGDBSyncQueries.useSyncCompanies(isSyncing),
    IGDBSyncQueries.useSyncPlatforms(isSyncing),
    IGDBSyncQueries.useSyncGenres(isSyncing),
    IGDBSyncQueries.useSyncGames(isSyncing),
  ];

  useEffect(() => {
    const completedCount = queries.filter(
      (q) => q.isSuccess || q.isError
    ).length;
    setProgress((completedCount / queries.length) * 100);

    if (completedCount === queries.length) {
      setTimeout(() => {
        setIsSyncing(false);
        setProgress(100);
        setIsFinished(true);
        modalController.setClickingOffModalClosesModel(true);
        modalController.setHideTopButtons(false);
      }, 500);
    }
  }, [queries]);

  const handleSync = () => {
    modalController.setClickingOffModalClosesModel(false);
    modalController.setHideBottomButtons(true);
    modalController.setHideTopButtons(true);
    setIsSyncing(true);
    setProgress(0);
  };
  const modalController = useModalController({
    onSuccess: handleSync,
    closeOnSuccess: false,
  });

  return (
    <>
      <div className="md:w-1/4 w-2/4 lg:mr-12 lg:mx-0 mx-12">
        <h1 className="md:text-3xl text-xl mt-8"> Update IGDB Dataset</h1>
        <hr className="h-px my-4 bg-black border-0 dark:bg-white" />
        <Button
          message="Update"
          query={() => modalController.setModalVisibility(true)}
        />
      </div>

      <Modal {...modalController}>
        {!isSyncing && !isFinished ? (
          <ConfirmationPage />
        ) : !isFinished ? (
          <SyncingPage progress={progress} />
        ) : (
          <SuccessPage
            completeMethod={() => modalController.setModalVisibility(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default IGBDUpdate;
