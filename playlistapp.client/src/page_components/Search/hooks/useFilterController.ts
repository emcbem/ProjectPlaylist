import { CompanyQueries } from "@/hooks/CompanyQueries";
import { GenreQueries } from "@/hooks/GenreQueries";
import { PlatformQueries } from "@/hooks/PlatformQueries";
import { useSearchDropdown } from "./useDropdown";
import { Company } from "@/@types/company";
import { Genre } from "@/@types/genre";
import { Platform } from "@/@types/platform";
import { SearchRequestController } from "@/@types/ComponentControllers/InfiniteGameController";
import { useEffect } from "react";

export const useFilterController = ({
  searchRequestController,
}: {
  searchRequestController: SearchRequestController;
}) => {
  const { data: genres } = GenreQueries.useGetAllGenres();
  const { data: companies } = CompanyQueries.useGetAllCompanies();
  const { data: platforms } = PlatformQueries.useGetAllPlatforms();

  const genreSelectorController = useSearchDropdown(
    "Genres",
    genres ?? ([] as Genre[]),
    (value: Genre) => {
      return value.name;
    }
  );

  const companySelectorController = useSearchDropdown(
    "Companies",
    companies ?? [],
    (option: Company) => option.name
  );

  const platformSelectorController = useSearchDropdown(
    "Platforms",
    platforms ?? ([] as Platform[]),
    (value: Platform) => {
      return value.name;
    }
  );

  useEffect(() => {
    searchRequestController.setSearchRequest((x) => ({
      ...x,
      genreIds: genreSelectorController.selectedOptions.map((x) => x.id),
      platformIds: platformSelectorController.selectedOptions.map((x) => x.id),
      companyIds: companySelectorController.selectedOptions.map((x) => x.id),
    }));
  }, [
    genreSelectorController.selectedOptions,
    platformSelectorController.selectedOptions,
    companySelectorController.selectedOptions,
  ]);

  return {
    genreSelectorController,
    companySelectorController,
    platformSelectorController,
    searchRequestController,
  };
};
