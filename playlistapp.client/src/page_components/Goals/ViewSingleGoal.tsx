import { Goal } from "@/@types/goal";
import { useAuth0 } from "@auth0/auth0-react";
import { CalculateDaysRemaining } from "./Functions/CalculateDaysRemaining";
import ProgressDisplay from "./Components/ProgressDisplay";
import EditGoalButton from "./Components/Buttons/EditGoalButton";
import GoalAchievementCard from "./Components/AchievementCard";
import GoalAccomplishDate from "./Components/ShowDates/DisplayGoalDate";
import GoalSetDate from "./Components/ShowDates/GoalSetDate";
import { FC } from "react";

interface props {
  goal: Goal;
  onEditClick: (goal: Goal) => void;
}

const GoalCard: FC<props> = ({ goal, onEditClick }) => {
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

          <GoalSetDate goal={goal}></GoalSetDate>

          <div className="w-full relative max-w-full flex justify-end items-end space-x-2">
            <EditGoalButton onEditClick={() => onEditClick(goal)} />

            <ProgressDisplay
              goal={goal}
              daysRemaining={daysRemaining || 0}
            ></ProgressDisplay>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalCard;
