import { FilterController } from "../types/FilterController";
import SearchDropdown from "./SearchDropdown";

export const MobileFilter = ({
  filterController,
  dropdownController
}: {
  filterController: FilterController;
  dropdownController: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}
}) => {

  const toggleDiv = () => {
    dropdownController.setOpen(!dropdownController.open);
  };

  return (
    <>
      <div
        className={`${
          dropdownController.open ? "relative dark:bg-black  w-full" : ""
        } pt-3 md:hidden block`}
      >
        
        <div
          className={`${
            dropdownController.open ? "block" : "hidden"
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
              className="border border-black dark:border-white w-full dark:text-white hover:bg-pppurple-300 dark:hover:bg-pporange-600 transition-all p-2 px-8 w-30 h-14 text-2xl rounded-lg sticky bottom-0 dark:bg-black "
              onClick={toggleDiv}
            >
              Close Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
