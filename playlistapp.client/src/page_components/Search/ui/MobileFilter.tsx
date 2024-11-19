import { FilterController } from "../types/FilterController";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const MobileFilter = ({
  filterController,
}: {
  filterController: FilterController;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={`${isVisible ? "relative dark:bg-black h-screen w-full" : ""} pt-3 md:hidden block`}>
        <div className="md:hidden block dark:bg-black">
          {!isVisible ? (
            <button
              className="border border-black dark:border-white dark:text-white w-full h-14 text-2xl rounded-lg pt-3"
              onClick={toggleDiv}
            >
              Filter
            </button>
          ) : (
            <div className="flex w-full bg-white dark:bg-black">
              <button
                className="dark:text-white  text-2xl rounded-lg"
                onClick={toggleDiv}
              >
                <XMarkIcon width={40} height={40} />
              </button>
              <button className="border border-black dark:border-white dark:text-white p-2 px-8 w-30 h-14 text-2xl rounded-lg justify-self-end">
                Clear All
              </button>
            </div>
          )}
        </div>
        <hr className="my-3"></hr>
        <div
          className={`${
            isVisible ? "block" : "hidden"
          }  md:hidden overflow-y-auto w-full bg-white dark:bg-black h-full z-auto`}
        >
          <div className="">
            <SearchDropdown
              controller={filterController.platformSelectorController}
            />
            <hr className="my-3 border border-clay-100" />

            <SearchDropdown
              controller={filterController.genreSelectorController}
            />
            <hr className="my-3 border border-clay-100" />

            <SearchDropdown
              controller={filterController.companySelectorController}
            />
            <hr className="my-3 border border-clay-100" />

            <button
              className="border border-black dark:border-white dark:text-black p-2 px-8 w-30 h-14 text-2xl rounded-lg sticky bottom-0 dark:bg-white "
              onClick={toggleDiv}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
