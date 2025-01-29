import SearchDropdown from "./SearchDropdown";
import { FilterController } from "../types/FilterController";

export const SideFilter = ({
  filterController,
}: {
  filterController: FilterController;
}) => {

  return (
    <>
      <div
        className={`fixed w-[250px] h-screen bg-gradient-to-b from-transparent from-2% via-gradientOrange via-[percentage:20%_35%] to-gradientBlue to-100% p-4 pt-[75px] overflow-y-auto md:block hidden`}
      >
        <SearchDropdown
          controller={filterController.platformSelectorController}
        />
        <hr className="my-3 border border-clay-100" />

        <SearchDropdown controller={filterController.genreSelectorController} />
        <hr className="my-3 border border-clay-100" />

        <SearchDropdown
          controller={filterController.companySelectorController}
        />
      </div>
      <div className="w-[350px] md:block hidden"></div>
    </>
  );
};
