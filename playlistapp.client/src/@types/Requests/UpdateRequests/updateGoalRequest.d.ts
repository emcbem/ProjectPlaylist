export interface UpdateGoalRequest {
  id: number;
  dateToAchieve: Date;
  isCurrent: boolean;
  isComplete: boolean;
  userId: string;
}
