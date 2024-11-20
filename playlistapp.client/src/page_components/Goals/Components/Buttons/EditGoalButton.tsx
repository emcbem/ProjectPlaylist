import { FC } from "react";

interface EditGoalButtonProps {
  onEditClick: () => void;
}

const EditGoalButton: FC<EditGoalButtonProps> = ({ onEditClick }) => {
  return (
    <div
      role="button"
      className={`px-4 py-2 text-base font-semibold text-center text-black cursor-pointer`}
      onClick={onEditClick}
    >
      Edit
    </div>
  );
};

export default EditGoalButton;
