export interface AddUserAchievementRequest {
    achievementId: number;
    userGuid: string;
    isSelfSubmitted: boolean;
    dateAchieved: Date;
}