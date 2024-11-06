import { Achievement } from "./achievement";
import { UserAccount } from "./userAccount";

export interface Goal {
    id: number,
    user: UserAccount,
    achievement: Achievement,
    dateToAchieve: Date,
    isCompleted: boolean,
    isCurrent: boolean,
    dateCompleted: Date,
    dateAdded: Date,
    likes: number,
    dislikes: number
}