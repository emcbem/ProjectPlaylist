import { useSearchRequest } from "../hooks/useInfiniteController";
import Dropdown from "./SelectOrder";
import { InfiniteGames } from "./InfiniteGames";
import { useFilterController } from "../hooks/useFilterController";
import { SideFilter } from "./SideFilter";
import { MobileFilter } from "./MobileFilter";

const SearchPage = () => {
  const searchRequest = useSearchRequest();
  const filterController = useFilterController({searchRequestController: searchRequest})

  return (
    <>
      <div className="relative">
        <MobileFilter filterController={filterController}/>

        <div className=" min-h-screen w-full left-2 bg-white dark:bg-black flex">
          <SideFilter filterController={filterController}/>
          <div className="ml-auto w-full h-fit p-4 overflow-y-auto">
            <div className="flex">
              <div className="ml-auto">
                <Dropdown setSearchRequest={searchRequest.setSearchRequest} />
              </div>
            </div>
            <InfiniteGames {...searchRequest} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
