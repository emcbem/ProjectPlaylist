import { FC } from "react";

interface EditGoalButtonProps {
  onEditClick: () => void;
}

const EditGoalButton: FC<EditGoalButtonProps> = ({ onEditClick }) => {
  return (
    <div
      role="button"
      className={`px-2 py-2 text-base font-semibold text-center text-black dark:text-white cursor-pointer underline hover:text-gray-400`}
      onClick={onEditClick}
    >
      Edit
    </div>
  );
};

export default EditGoalButton;
