import { FC } from "react";

interface DeleteGoalButtonProps {
  onDeleteClick: () => void;
  modal: boolean;
}

const DeleteGoalButton: FC<DeleteGoalButtonProps> = ({
  onDeleteClick,
  modal,
}) => {
  return (
    <>
      {!modal ? (
        <div
          role="button"
          className="px-2 py-2 text-base font-semibold text-center text-red-600 cursor-pointer underline hover:text-red-500"
          onClick={onDeleteClick}
        >
          Delete
        </div>
      ) : (
        <div className="pl-6 pt-4">
          <button
            className="w-full rounded-md bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white"
            type="button"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteGoalButton;
