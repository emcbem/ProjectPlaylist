import { FC } from "react";

interface UpdateGoalButtonProps {
  handleUpdate: () => void;
}

const UpdateGoalButton: FC<UpdateGoalButtonProps> = ({ handleUpdate }) => {
  return (
    <div className="p-6 pb-0">
      <button
        className="w-full rounded-md bg-clay-900 hover:bg-clay-800 py-2 px-4 text-sm text-white"
        type="submit"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateGoalButton;
