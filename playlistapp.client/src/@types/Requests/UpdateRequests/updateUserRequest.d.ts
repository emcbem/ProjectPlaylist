export interface UpdateUserRequest {
    guid: string,
    username: string,
    bio: string,
    strikes: number,
    xp: number,
    userImageID: number,
    notifyOnReviewLiked: boolean | null;
    notifyOnReviewDisliked: boolean | null;
    notifyOnGoalEndingSoon: boolean | null;
    notifyOnGoalLiked: boolean | null;
    notifyOnGoalDisliked: boolean | null
    notifyOnAchievementLiked: boolean | null;
    notifyOnAchievementDisliked: boolean | null;
    notifyOnFriendRequestRecieved: boolean | null;
    notifyOnFriendRequestAccepted: boolean | null;
}