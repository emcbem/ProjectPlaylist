import { Company } from "./company";

export interface Game {
  id: number;
  idgb_id: number;
  title: string;
  description: string;
  ageRating: string;
  publishDate: string;
  coverUrl: string;
  companies: Company[];
}
