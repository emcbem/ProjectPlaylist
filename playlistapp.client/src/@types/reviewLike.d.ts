import { GameReview } from "./gameReview";
import { UserAccount } from "./userAccount";

export interface ReviewLike {
  id: number;
  userId: string;
  gameReviewId: number;
  isLike: boolean;
  dateLiked: Date;
  gameReviewed: GameReview;
  user: UserAccount;
}
