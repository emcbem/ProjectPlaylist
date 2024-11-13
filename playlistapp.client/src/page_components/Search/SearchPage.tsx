import { InfiniteGames } from "@/page_components/Search/InfiniteGames";
import { useEffect, useState } from "react";
import { useSelector } from "./hooks/useSelector";
import { Genre } from "@/@types/genre";
import { Selector } from "./Selector";
import { useSearchRequest } from "./hooks/useInfiniteController";
import { GenreQueries } from "@/hooks/GenreQueries";
import { useSearchBarContext } from "@/hooks/useSearchBarContext";
import { PlatformQueries } from "@/hooks/PlatformQueries";
import { Platform } from "@/@types/platform";
import Dropdown from "./SelectOrder";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Company } from "@/@types/company";
import { CompanyQueries } from "@/hooks/CompanyQueries";

const SearchPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const searchRequest = useSearchRequest();
  const searchBarContext = useSearchBarContext();

  const { data: genres, isLoading: genresLoading } =
    GenreQueries.useGetAllGenres();
  const genreSelectorController = useSelector<Genre>(
    "Filter By Genres",
    genres ?? ([] as Genre[]),
    (value: Genre) => {
      return value.name;
    }
  );

  const { data: platforms, isLoading: platformsLoading } =
    PlatformQueries.useGetAllPlatforms();
  const platformSelectorController = useSelector<Platform>(
    "Filter By Platforms",
    platforms ?? ([] as Platform[]),
    (value: Genre) => {
      return value.name;
    }
  );

  const {data: companies, isLoading: companiesLoading} = CompanyQueries.useGetAllCompanies()
  const companySelectorController = useSelector<Company>("Filter By Companies", companies ?? [],
    (value: Company) => {
      return value.name
    }
  )

  useEffect(() => {
    searchRequest.setSearchRequest((x) => ({
      ...x,
      genreIds: genreSelectorController.selectedItems.map((x) => x.id),
      title: searchBarContext.searchQuery,
      platformIds: platformSelectorController.selectedItems.map((x) => x.id),
      companyIds: companySelectorController.selectedItems.map(x => x.id)
    }));
  }, [
    genreSelectorController.selectedItems,
    searchBarContext.searchQuery,
    platformSelectorController.selectedItems,
    companySelectorController.selectedItems
  ]);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="relative">
        <div className="md:hidden block">
          {!isVisible ? (
            <button
              className="border border-black dark:border-white dark:text-white w-full h-14 text-2xl rounded-lg pt-3"
              onClick={toggleDiv}
            >
              Filter
            </button>
          ) : (
            <div className="flex w-screen bg-white">
              <button
                className="dark:text-white p-2 text-2xl rounded-lg"
                onClick={toggleDiv}
              >
                <XMarkIcon width={40} height={40}/>
              </button>
              <button className="border border-black dark:border-white dark:text-white p-2 px-8 w-30 h-14 text-2xl rounded-lg justify-self-end">
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="min-h-screen bg-white dark:bg-black flex">
          <div className="w-[300px] h-screen bg-gradient-to-b from-[#ff704e00] to-[#602B53] p-4 pt-[75px] sticky top-0 left-0 overflow-y-auto md:block hidden">
            {!platformsLoading &&
              Selector<Platform>(platformSelectorController)}
            <hr className="my-3 border border-clay-100" />

            {!genresLoading && Selector<Genre>(genreSelectorController)}
            <hr className="my-3 border border-clay-100" />

            {!companiesLoading && Selector<Company>(companySelectorController)}
          </div>
          <div className="ml-auto w-full h-fit p-4 overflow-y-auto">
            <div className="flex">
              <div className="ml-auto">
                <Dropdown
                  setSearchRequest={searchRequest.setSearchRequest}
                />
              </div>
            </div>
            <InfiniteGames {...searchRequest} />
          </div>
        </div>

        <div
          className={`${
            isVisible ? "block" : "hidden"
          } block md:hidden absolute top-14 left-0 overflow-y-auto h-screen bg-white dark:bg-black`}
        >
          <div className="">
            <p className="text-xl mt-5 mb-3">Filter by Platform</p>
            <div className="flex flex-wrap">
              {["Steam", "Nintendo", "Xbox", "Playstation", "Epic Games"].map(
                (platform) => (
                  <div
                    key={platform}
                    className="rounded-full p-3 px-7 border-[#111111] dark:border-[#ffffff] m-2 border-2 hover:bg-gray-300 dark:hover:bg-red-500"
                  >
                    {platform}
                  </div>
                )
              )}
            </div>

            {!genresLoading && Selector<Genre>(genreSelectorController)}
            <button
              className="border border-black dark:border-white dark:text-black p-2 px-8 w-30 h-14 text-2xl rounded-lg sticky bottom-0 dark:bg-white w-screen"
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

export default SearchPage;
