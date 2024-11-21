import { Goal } from "@/@types/goal";
import { GoalQueries } from "@/hooks/GoalQueries";
import { FC } from "react";
import CancelGoalButton from "../Buttons/CancelGoalButton";
import DeleteGoalButton from "../Buttons/DeleteGoalButton";

interface GoalModalDeleteProps {
  goal: Goal;
  onClose: () => void;
}

const GoalModalDelete: FC<GoalModalDeleteProps> = ({ goal, onClose }) => {
  const { mutate: DeleteGoal } = GoalQueries.useDeleteGoal(goal.id);

  const handleDelete = () => {
    DeleteGoal();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
      <div className="dark:bg-clay-400 bg-gray-100 p-6 rounded shadow-md sm:w-1/2 sm:mx-0 w-full mx-4">
        <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
          Are you sure you want to delete the goal for {goal.achievement.name}?
        </h2>
        <p className=" mb-6 text-red-600">
          Warning: Your goal will be deleted forever
        </p>
        <div className="flex justify-end">
          <DeleteGoalButton onDeleteClick={handleDelete} modal={true} />
          <CancelGoalButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default GoalModalDelete;
