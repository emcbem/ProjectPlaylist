import { Goal } from "@/@types/goal";
import { FC } from "react";

interface ProgressDisplayProps {
  goal: Goal;
  daysRemaining: number;
}

const ProgressDisplay: FC<ProgressDisplayProps> = ({ goal, daysRemaining }) => {
  return (
    <div
      className={`px-4 py-2 text-base font-semibold rounded-sm text-center ${
        goal.isCompleted
          ? "bg-green-600 text-white dark:text-black dark:bg-green-600"
          : daysRemaining! < 1
          ? "bg-red-700 text-white"
          : "bg-yellow-200 text-black"
      }`}
    >
      {goal.isCompleted
        ? "Completed"
        : daysRemaining! < 1
        ? "Failed"
        : "In Progress"}
    </div>
  );
};

export default ProgressDisplay;
