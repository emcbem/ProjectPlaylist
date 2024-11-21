import { Goal } from "@/@types/goal";
import formatDate from "@/lib/date";
import { FC } from "react";
import GoalCurrentIcon from "../Icons/GoalCurrentIcon";

interface DisplayGoalDateProps {
  goal: Goal;
  daysRemaining: number;
}

const GoalAccomplishDate: FC<DisplayGoalDateProps> = ({
  goal,
  daysRemaining,
}) => {
  return (
    <div className="flex flex-wrap text-xl text-gray-800 dark:text-white relative">
      <div className="w-2/3">
        <div className="">
          {daysRemaining === 0 && !goal.isCompleted && (
            <p className=" font-bold">
              Looks like you ran out of time!
            </p>
          )}
          {goal.isCompleted && (
            <p className="text-nowrap font-bold">Congratualtions!</p>
          )}
          {daysRemaining! > 0 && (
            <p className="text-nowrap font-bold">
              Due in {daysRemaining} day{daysRemaining != 1 ? "s" : ""}
            </p>
          )}
          {!goal.dateCompleted && (
            <div className="flex flex-wrap text-lg text-gray-800 dark:text-white">
              <p className="text-nowrap">
                Accomplish by {formatDate(goal.dateToAchieve)}
              </p>
            </div>
          )}
          {goal.dateCompleted && (
            <div className="flex flex-wrap text-lg text-gray-800 dark:text-white">
              <p className="text-nowrap">
                Completed On: {formatDate(goal.dateCompleted)}
              </p>
            </div>
          )}
          {goal.isCurrent && (
            <div className="text-bold absolute right-0 top-0">
              <GoalCurrentIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalAccomplishDate;
