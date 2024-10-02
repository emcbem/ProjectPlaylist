
export interface Achievement {
    Id: number;
    PlatformGameId: number;
    ImageUrl: string;
    AchievementName: string;
    AchievementDesc: string;
    Goals: string;
    PlatformGame: PlatformGame;
    //UserAchievements: UserAchievement;
}