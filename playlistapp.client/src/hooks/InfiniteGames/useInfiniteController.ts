import { OrderingMethods } from '@/@types/Enums/OrderingMethod';
import { GetGamesRequest } from '@/@types/Requests/GetRequests/getGamesRequest';
import { useState } from 'react'

export const useInfiniteController = () => {
    const [searchRequest, setSearchRequest] = useState<GetGamesRequest>({
    title: "",
    page: 0,
    companyIds: [],
    genreIds: [],
    platformIds: [],
    pageSize: 10,
    orderingMethod: OrderingMethods.AZ,
  });
  return ({
    searchRequest,
    setSearchRequest
  }
  )
}
