import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IGDBSyncQueries } from "@/queries/IGDBSyncQueries";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
      <style>
        {`
    @keyframes gradientSlide {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    `}
      </style>
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
            <>
              <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
                Are you sure you would like to sync IGDB?
              </h2>
              <p className="mb-6 text-red-600">
                Warning: This can take up 5 minutes. IGDB items that are no
                longer in the database will be deleted, causing data loss.
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={handleSync}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={closeModal}
                  type="reset"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : !isFinished ? (
            <>
              <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
                Syncing IGDB...
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div className="relative h-4 rounded-full overflow-hidden bg-gray-300">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pporange-500 via-blue-400 to-pppurple-500 transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundSize: "200% 100%",
                      animation: "gradientSlide 2s linear infinite",
                    }}
                  ></div>
                </div>
              </div>
              <p className="mt-4 text-center dark:text-white text-clay-50">
                {progress.toFixed(0)}% complete
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-3xl mb-4 text-green-600">It is done!</h2>
                <p className="text-gray-700 dark:text-white">
                  IGDB sync has been completed successfully.
                </p>
                <Button message="Close" query={closeModal} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default IGBDUpdate;
