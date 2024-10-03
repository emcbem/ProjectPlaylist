import { Achievement } from "./achievement";
import { UserAccount } from "./userAccount";

export interface Goal {
    Id: number;
    UserId: number;
    AchievementId: number;
    DateToAchieve: Date;
    IsComplete: boolean;
    IsCurrent: boolean;
    DateCompleted: DateTime;
    DateAdded: DateTime;
    Achievement: Achievement;
    // TODO: Goal Likes
    User: UserAccount;
}