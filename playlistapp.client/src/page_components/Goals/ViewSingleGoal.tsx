import { Goal } from "@/@types/goal";
import { useAuth0 } from "@auth0/auth0-react";
import { CalculateDaysRemaining } from "./Functions/CalculateDaysRemaining";
import ProgressDisplay from "./Components/ProgressDisplay";
import EditGoalButton from "./Components/Buttons/EditGoalButton";
import GoalAchievementCard from "./Components/AchievementCard";
import GoalAccomplishDate from "./Components/ShowDates/DisplayGoalDate";
import GoalSetDate from "./Components/ShowDates/GoalSetDate";
import { FC } from "react";
import DeleteGoalButton from "./Components/Buttons/DeleteGoalButton";

interface props {
  goal: Goal;
  onEditClick: (goal: Goal) => void;
  onDeleteClick: (goal: Goal) => void;
}

const GoalCard: FC<props> = ({ goal, onEditClick, onDeleteClick }) => {
  const { isAuthenticated } = useAuth0();

  const daysRemaining = goal?.dateToAchieve
    ? CalculateDaysRemaining(goal.dateToAchieve)
    : null;

  return (
    isAuthenticated &&
    goal && (
      <div className="w-full relative max-w-full flex bg-gray-100 dark:bg-clay-400 shadow-md rounded-lg my-4 p-6">
        <div className="flex flex-col justify-between w-full">
          <div>
            <GoalAccomplishDate
              goal={goal}
              daysRemaining={daysRemaining || 0}
            ></GoalAccomplishDate>
          </div>

          <GoalAchievementCard goal={goal}></GoalAchievementCard>

          <div className="w-full flex flex-wrap items-center mt-2">
            <div className="w-full md:w-1/2 mb-2 md:mb-0">
              <GoalSetDate goal={goal}></GoalSetDate>
            </div>

            <div className="w-full md:w-1/2 flex justify-end items-center space-x-2">
              <DeleteGoalButton
                onDeleteClick={() => onDeleteClick(goal)}
                modal={false}
              />
              <EditGoalButton onEditClick={() => onEditClick(goal)} />
              <ProgressDisplay goal={goal} daysRemaining={daysRemaining || 0} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalCard;
