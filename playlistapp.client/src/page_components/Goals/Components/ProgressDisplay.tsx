import { Goal } from "@/@types/goal";
import { FC } from "react";
import GoalCheckMark from "./Icons/GoalCheckMark";
import GoalFailIcon from "./Icons/GoalFailIcon";
import GoalProgressIcon from "./Icons/GoalProgressIcon";

interface ProgressDisplayProps {
  goal: Goal;
  daysRemaining: number;
}

const ProgressDisplay: FC<ProgressDisplayProps> = ({ goal, daysRemaining }) => {
  return (
    <div className={`text-base font-semibold justify-center items-center`}>
      {goal.isCompleted ? (
        <GoalCheckMark />
      ) : daysRemaining! < 1 ? (
        <GoalFailIcon />
      ) : (
        <GoalProgressIcon />
      )}
    </div>
  );
};

export default ProgressDisplay;
