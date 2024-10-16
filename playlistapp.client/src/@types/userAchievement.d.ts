import { Achievement } from "./achievement";
import { UserAccount } from "./userAccount";

export interface UserAchievement {
    id: number;
    achievement: Achievement;
    user: UserAccount;
    isSelfSubmitted: boolean;
    dateAchieved: Date;
    likes: number;
    dislikes: number;
}