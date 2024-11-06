export interface AddGoalRequest {
    userId: string,
    achievementId: number,
    dateToAchieve: Date,
    isCurrent: boolean
}