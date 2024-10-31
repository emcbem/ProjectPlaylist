import { GetGamesRequest } from "../Requests/GetRequests/getGamesRequest";

export interface SearchRequestController {
    searchRequest: GetGamesRequest,
    setSearchRequest: React.Dispatch<React.SetStateAction<GetGamesRequest>>
}