const GoalLikeKeys = {
  AddGoalLike: ["GoalLike", "AddGoalLike"] as const,
  GetGoalLikesFromUser: (userId: string) =>
    ["GoalLike", "GetGoalLikesFromUser", userId] as const,
  GetGoalLike: ["GoalLike", "GetGoalLike"] as const,
  UpdateGoalLike: ["GoalLike", "UpdateGoalLike"] as const,
};

export default GoalLikeKeys;
