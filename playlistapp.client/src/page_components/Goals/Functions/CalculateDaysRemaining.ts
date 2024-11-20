export function CalculateDaysRemaining(dueDate: Date | string) {
  const dueDateObj = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  if (isNaN(dueDateObj.getTime())) return null;
  const today = new Date();
  const timeDifference = dueDateObj.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysRemaining > 0 ? daysRemaining : 0;
}
