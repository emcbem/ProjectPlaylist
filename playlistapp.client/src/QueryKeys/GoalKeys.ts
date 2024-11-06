const GoalKeys = {
  AddGoal: ["Goal", "AddGoal"] as const,
  GetGoalById: (goalId: number) => ["Goal", "GetGoalById", goalId] as const,
  GetGoalsByUser: (userId: string) =>
    ["Goal", "GetGoalsByUser", userId] as const,
  UpdateGoal: ["Goal", "UpdateGoal"],
};

export default GoalKeys;
