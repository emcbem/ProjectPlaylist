import { GetGamesRequest } from "@/@types/Requests/GetRequests/getGamesRequest";

const GameKeys = {
  GameByName: ["Game", "ByName"] as const,
  GameById: ["Game", "ById"] as const,
  QueriedGames: (request: GetGamesRequest) => ['QueriedGames', request] as const,
  GetAllGames: ["Game", "GetAllGames"] as const,
};

export default GameKeys;
