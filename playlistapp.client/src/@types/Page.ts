import { Game } from "./game";

export interface Page {
    pageGames: Game[];
    previousCursor?: number;
    nextCursor?: number;
  }