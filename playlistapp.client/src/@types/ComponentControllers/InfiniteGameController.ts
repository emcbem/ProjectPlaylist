import { GetGamesRequest } from "../Requests/GetRequests/getGamesRequest";

export interface InfiniteGameController {
    searchRequest: GetGamesRequest,
    setSearchRequest: React.Dispatch<React.SetStateAction<GetGamesRequest>>
}