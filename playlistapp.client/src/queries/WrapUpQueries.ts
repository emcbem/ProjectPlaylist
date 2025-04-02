import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";
import { WrapUpService } from "@/ApiServices/WrapUpService";
import { WrapUpKeys } from "@/QueryKeys/WrapUpKeys";
import { useQuery } from "@tanstack/react-query";

export const WrapUpQueries = {
  GetWrapUp: (request: GetWrapUpRequest) => {
    return useQuery({
      queryFn: () => WrapUpService.GetWrapUp(request),
      queryKey: WrapUpKeys.GetWrapUp(request),
    });
  },
};
