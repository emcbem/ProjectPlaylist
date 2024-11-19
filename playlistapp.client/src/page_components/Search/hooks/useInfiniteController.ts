import { OrderingMethods } from "@/@types/Enums/OrderingMethod";
import { GetGamesRequest } from "@/@types/Requests/GetRequests/getGamesRequest";
import { useSearchBarContext } from "@/hooks/useSearchBarContext";
import { useEffect, useState } from "react";

export const useSearchRequest = () => {
  const searchBarContext = useSearchBarContext();

  const [searchRequest, setSearchRequest] = useState<GetGamesRequest>({
    title: "",
    page: 0,
    companyIds: [],
    genreIds: [],
    platformIds: [],
    pageSize: 10,
    orderingMethod: OrderingMethods.AZ,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchRequest((x) => ({
        ...x,
        title: searchBarContext.searchQuery,
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchBarContext.searchQuery]);
  return {
    searchRequest,
    setSearchRequest,
  };
};
