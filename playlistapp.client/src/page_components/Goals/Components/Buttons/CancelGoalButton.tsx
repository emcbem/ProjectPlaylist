import { FC } from "react";

interface CancelGoalButtonProps {
  onClose: () => void;
}

const CancelGoalButton: FC<CancelGoalButtonProps> = ({ onClose }) => {
  return (
    <div className="pr-6 pl-6 pt-4">
      <button
        className="w-full rounded-md bg-clay-600 hover:bg-clay-500 py-2 px-4 text-sm text-white"
        role="button"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default CancelGoalButton;
