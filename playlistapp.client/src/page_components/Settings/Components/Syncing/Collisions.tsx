import { ItemAction } from "@/@types/Combination/itemAction";
import { ItemOption } from "@/@types/Combination/itemOption";
import { ItemActionQueries } from "@/queries/ItemActionQueires";
import { useState } from "react";

const Collisions = ({
  conflicts,
  setConflicts,
  hasCompleted,
}: {
  conflicts: ItemAction[] | undefined;
  setConflicts: React.Dispatch<React.SetStateAction<ItemAction[] | undefined>>;
  hasCompleted: () => void;
}) => {
  const [selected, setSelected] = useState<ItemOption>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { mutate: handleCollision } = ItemActionQueries.useHandleCollisions(
    selected ? selected.resolveUrl : ""
  );
  const currentAction: ItemAction = conflicts?.at(0) ?? ({} as ItemAction);

  const handleConfirmation = () => {
    if (selected && conflicts && conflicts?.length > 0) {
      if (conflicts && currentIndex < Object.entries(conflicts).length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (currentIndex == Object.entries(conflicts).length - 1) {
        hasCompleted();
      }
      handleCollision();
      setConflicts(conflicts.filter((x) => x !== currentAction));
    }
  };

  return (
    <>
      <h1 className="text-2xl text-red-500">{currentAction.errorType}</h1>
      {conflicts && conflicts.length > 0 && (
        <h1 className="text-2xl text-white">
          {currentAction.itemOptions.at(0)?.gameTitle}
        </h1>
      )}
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="mb-2 text-lg text-white flex flex-col justify-center">
          {conflicts &&
            conflicts.length > 0 &&
            currentAction.itemOptions.map((itemOption) => {
              return (
                <button
                  key={itemOption.resolveUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(
                      currentAction.itemOptions.find(
                        (item) => item.resolveUrl == itemOption.resolveUrl
                      )
                    );
                  }}
                  className={`border-2  p-2 rounded-full m-3 transition-all ${
                    selected?.resolveUrl == itemOption.resolveUrl
                      ? "bg-white text-black border-black"
                      : "border-white hover:bg-white hover:text-black hover:border-black"
                  }`}
                >
                  {itemOption.errorText} -{" "}
                  {parseFloat((itemOption.hours / 60).toFixed(2))} hours
                </button>
              );
            })}
        </div>
      </div>
      <div className={`flex flex-row w-full prevent`}>
        <button
          onClick={(e) => {
            handleConfirmation();
            e.preventDefault();
          }}
          className={`w-full rounded-md bg-green-500 py-2 px-4 text-sm text-white  ${
            selected ? "" : "opacity-50 cursor-not-allowed"
          } `}
          type="submit"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default Collisions;
