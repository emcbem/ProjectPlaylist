import { Company } from "./company";
import { GameReview } from "./gameReview";
import { Platform } from "./platform";
import { PlatformGame } from "./platformGame";

export interface Game {
  id: number;
  idgb_id: number;
  title: string;
  description: string;
  ageRating: string;
  publishDate: Date;
  coverUrl: string;
  companies: Company[];
  platforms: PlatformGame[];
  genres: Genre[];
  reviews: GameReview[];
  hoursPlayed: number,
  totalOwned: number
}
