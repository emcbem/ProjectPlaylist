import { IGDBSyncService } from "@/ApiServices/IGDBSyncService";
import CompanyKeys from "@/QueryKeys/CompanyKeys";
import GameKeys from "@/QueryKeys/GameKeys";
import PlatformKeys from "@/QueryKeys/PlatformKeys";
import { useQuery } from "@tanstack/react-query";

export const IGDBSyncQueries = {
  useSyncCompanies: (ableToRun: boolean) => {
    return useQuery({
      queryFn: () => IGDBSyncService.syncCompanies(),
      queryKey: CompanyKeys.GetAllCompanies,
      enabled: ableToRun,
    });
  },
  useSyncPlatforms: (ableToRun: boolean) => {
    return useQuery({
      queryFn: () => IGDBSyncService.syncPlatforms(),
      queryKey: PlatformKeys.GetAllPlatforms,
      enabled: ableToRun,
    });
  },
  useSyncGenres: (ableToRun: boolean) => {
    return useQuery({
      queryFn: () => IGDBSyncService.syncGenres(),
      queryKey: ["Genres", "GetAllGenres"],
      enabled: ableToRun,
    });
  },
  useSyncGames: (ableToRun: boolean) => {
    return useQuery({
      queryFn: () => IGDBSyncService.syncGames(),
      queryKey: GameKeys.GetAllGames,
      enabled: ableToRun,
    });
  },
};
