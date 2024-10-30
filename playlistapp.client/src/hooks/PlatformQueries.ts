import { useQuery } from "@tanstack/react-query";
import keys from "../QueryKeys/PlatformKeys";
import { PlatformService } from "@/ApiServices/PlatformService";

export const PlatformQueries = {
  useGetAllPlatforms: () => {
    return useQuery({
      queryKey: keys.GetAllPlatforms,
      queryFn: () => PlatformService.GetAllPlatforms(),
    });
  },
};
