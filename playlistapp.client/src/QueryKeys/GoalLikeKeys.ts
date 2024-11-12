const GoalLikeKeys = {
  AddGoalLike: ["GoalLike", "AddGoalLike"] as const,
  GetGoalLikesFromUser: (userId: string) =>
    ["GoalLike", "GetGoalLikesFromUser", userId] as const,
};

export default GoalLikeKeys;
