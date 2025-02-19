import { useSearchRequest } from "../hooks/useInfiniteController";
import Dropdown from "./SelectOrder";
import { InfiniteGames } from "./InfiniteGames";
import { useFilterController } from "../hooks/useFilterController";
import { SideFilter } from "./SideFilter";
import { MobileFilter } from "./MobileFilter";
import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import MainLayout from "@/layout/MainLayout";

const SearchPage = () => {
  const searchRequest = useSearchRequest();
  const [open, setOpen] = useState<boolean>(false);
  const filterController = useFilterController({
    searchRequestController: searchRequest,
  });

  return (
    <MainLayout>
      <div className="relative w-full">
        <MobileFilter
          filterController={filterController}
          dropdownController={{ open, setOpen }}
        />
        <div className=" min-h-screen w-full left-2 bg-white dark:bg-black flex">
          <SideFilter filterController={filterController} />
          <div className="ml-auto w-full h-fit py-4">
            <div className="flex">
              <div
                className="ps-4 block md:hidden"
                onClick={() => setOpen((x) => !x)}
              >
                <FunnelIcon className="w-[50px] hover:fill-current hover:scale-105 transition-all" />
              </div>
              <div className="ml-auto h-full">
                <Dropdown setSearchRequest={searchRequest.setSearchRequest} />
              </div>
            </div>
            <InfiniteGames {...searchRequest} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
