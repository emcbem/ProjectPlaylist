import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { IGDBSyncQueries } from "@/queries/IGDBSyncQueries";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import "./ProgressBar.css";
import { SuccessPage } from "./SuccessPage";
import { ConfirmationPage } from "./ConfirmationPage";
import { SyncingPage } from "./SyncingPage";

const IGBDUpdate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => !isSyncing && setIsOpen(false);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !isSyncing
    ) {
      closeModal();
    }
  };

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
      }, 500);
    }
  }, [queries]);

  const handleSync = async () => {
    setIsSyncing(true);
    setProgress(0);
  };

  return (
    <>
      <div className="md:w-1/4 w-2/4 lg:mr-12 lg:mx-0 mx-12">
        <h1 className="md:text-3xl text-xl mt-8"> Update IGDB Dataset</h1>
        <hr className="h-px my-4 bg-black border-0 dark:bg-white" />
        <Button message="Update" query={openModal} />
      </div>

      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[10000] grid h-screen w-screen place-items-center dark:bg-black bg-white dark:bg-opacity-60 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-auto rounded-lg overflow-hidden shadow-sm bg-white dark:bg-clay-400 transition-transform duration-300 flex flex-col p-8 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          {!isSyncing && !isFinished ? (
            <ConfirmationPage closeModal={closeModal} startSync={handleSync} />
          ) : !isFinished ? (
            <SyncingPage progress={progress} />
          ) : (
            <SuccessPage completeMethod={closeModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default IGBDUpdate;
