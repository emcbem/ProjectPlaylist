import { Goal } from "@/@types/goal";
import formatDate from "@/lib/date";
import { FC } from "react";

interface DisplayGoalDateProps {
  goal: Goal;
  daysRemaining: number;
}

const GoalAccomplishDate: FC<DisplayGoalDateProps> = ({ goal, daysRemaining }) => {
  return (
    <div className="flex flex-wrap text-xl text-gray-800 dark:text-white">
      <div className="w-1/3">
        <div>
          {daysRemaining === 0 && (
            <p className="text-nowrap font-bold">
              Looks like you ran out of time!
            </p>
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
            <div className="lg:w-2/12 md:w-3/12 w-4/12 mr-2">
              <p className="font-bold">Completed On:</p>{" "}
              {formatDate(goal.dateCompleted)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalAccomplishDate;
