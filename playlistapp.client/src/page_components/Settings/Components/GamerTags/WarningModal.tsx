import { ItemAction } from "@/@types/Combination/itemAction";
import { ItemOption } from "@/@types/Combination/itemOption";
import { PlaystationDTO } from "@/@types/Playstation/playstationDTO";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

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
  // const [currentIndex, setCurrentIndex] = useState(0);

  const user: PlaystationDTO = {
    userId: userId,
    accountId: accountId,
  };
  const { data: orchestrateAccountSync } =
    PlaystationQueries.useOrchestrateInitialPlaystationAccountSync(user);

  const [conflicts, setConflicts] =
    useState<{ category: string; items: ItemOption[] }[]>();

  useEffect(() => {
    if (syncData) {
      reduceList(syncData.itemOptions);
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

  const reduceList = (items: ItemOption[]) => {
    const groupedByGame = Array.from(
      items.reduce((map, item) => {
        if (!map.has(item.gameTitle)) {
          map.set(item.gameTitle, []);
        }
        map.get(item.gameTitle)!.push(item);
        return map;
      }, new Map<string, ItemOption[]>())
    ).map(([category, items]) => ({ category, items }));

    setConflicts(groupedByGame);
  };

  // const handleNext = () => {
  //   if (conflicts && currentIndex < Object.entries(conflicts).length - 1) {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   }
  // };

  //TODO: Turn games found into buttons to select, hide 'yes' 'no' buttons after inital consent => Make endpoint for the selection to be called on

  return (
    <>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            isModalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5 items-center"
          >
            {loading && <LoadingDots />}
            {!loading && !syncData && (
              <>
                <h1 className="text-2xl text-red-500">Warning</h1>
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-lg text-white">
                    By syncing your PSN data, it will import your PSN library's
                    data which includes game library and playtime. By doing so,
                    there might be collisions you will have to manually resolve.
                    Are you okay with this?
                  </label>
                </div>
                <div className="p-6 pb-0 px-0 flex flex-row w-full">
                  <button
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-red-500 py-2 px-4 text-sm m-2 text-white"
                    type="submit"
                  >
                    No thank you.
                  </button>
                  <button
                    onClick={handleConfirmation}
                    className="w-full rounded-md bg-green-500 py-2 px-4 text-sm m-2 text-white"
                    type="submit"
                  >
                    Yes!
                  </button>
                </div>
              </>
            )}
            {syncData && (
              <>
                <h1 className="text-2xl text-red-500">{syncData.errorType}</h1>
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-lg text-white">
                    {conflicts &&
                      conflicts[0].items.map((n) => {
                        return (
                          <div key={n.errorText} className="flex flex-row">
                            <p> {n.gameTitle} On</p>
                            <p>&nbsp;{n.errorText}</p>
                            <p>&nbsp;{n.hours} hours</p>
                          </div>
                        );
                      })}
                  </label>
                </div>
                <div className="p-6 pb-0 px-0 flex flex-row w-full">
                  <button
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-red-500 py-2 px-4 text-sm m-2 text-white"
                    type="submit"
                  >
                    No thank you.
                  </button>
                  <button
                    onClick={handleConfirmation}
                    className="w-full rounded-md bg-green-500 py-2 px-4 text-sm m-2 text-white"
                    type="submit"
                  >
                    Yes!
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
