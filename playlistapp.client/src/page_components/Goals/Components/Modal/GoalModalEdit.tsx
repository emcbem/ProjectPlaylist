import { Goal } from "@/@types/goal";
import { UpdateGoalRequest } from "@/@types/Requests/UpdateRequests/updateGoalRequest";
import { GoalQueries } from "@/queries/GoalQueries";
import { FC, useContext, useState } from "react";
import UpdateGoalButton from "../Buttons/UpdateGoalButton";
import CancelGoalButton from "../Buttons/CancelGoalButton";
import GoalAchievementCard from "../AchievementCard";
import GoalDateSelector from "./GoalDateSelector";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import CheckBox from "@/individual_components/Checkbox";

interface GoalModalEditProps {
  goal: Goal;
  onClose: () => void;
}

const GoalModalEdit: FC<GoalModalEditProps> = ({ goal, onClose }) => {
  const user = useContext(UserAccountContext);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isCompleted);
  const [isCurrent, setIsCurrent] = useState<boolean>(goal.isCurrent);
  const [month, setMonth] = useState<string>(
    goal.dateToAchieve
      ? String(new Date(goal.dateToAchieve).getMonth() + 1)
      : ""
  );
  const [day, setDay] = useState<string>(
    goal.dateToAchieve ? String(new Date(goal.dateToAchieve).getDate()) : ""
  );
  const [year, setYear] = useState<string>(
    goal.dateToAchieve ? String(new Date(goal.dateToAchieve).getFullYear()) : ""
  );

  const updateGoalRequest: UpdateGoalRequest = {
    id: goal.id,
    isComplete: isComplete,
    isCurrent: isCurrent,
    dateToAchieve: new Date(`${month}/${day}/${year}`),
    userId: user?.userGuid ?? "",
  };

  const { mutate: UpdateGoal } = GoalQueries.useUpdateGoal(
    updateGoalRequest,
    user?.userGuid ?? ""
  );

  const handleUpdate = () => {
    UpdateGoal();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
      <div className="dark:bg-clay-400 bg-gray-100 p-6 rounded shadow-md sm:w-1/2 sm:mx-0 w-full mx-4">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold text-center">Edit Goal</h2>
        </div>

        <GoalAchievementCard goal={goal} />

        <div className="flex items-center justify-center space-x-4">
          <CheckBox
            title="Completed"
            value={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          <CheckBox
            title="Current"
            value={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
          />
        </div>
        <GoalDateSelector
          month={month}
          day={day}
          year={year}
          setMonth={setMonth}
          setDay={setDay}
          setYear={setYear}
        />

        <UpdateGoalButton handleUpdate={handleUpdate} />
        <CancelGoalButton onClose={onClose} />
      </div>
    </div>
  );
};

export default GoalModalEdit;
