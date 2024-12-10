const GoalKeys = {
  AddGoal: ["Goal", "AddGoal"] as const,
  GetGoalById: (goalId: number) => ["Goal", "GetGoalById", goalId] as const,
  GetGoalsByUser: (userId: string) =>
    ["Goal", "GetGoalsByUser", userId] as const,
  UpdateGoal: (goalId: number) => ["Goal", "UpdateGoal", goalId] as const,
  DeleteGoal: (goalId: number) => ["Goal", "DeleteGoal", goalId] as const,
  GetGoalToComplete: ["Goal", "GetGoalToComplete"] as const,
};

export default GoalKeys;
