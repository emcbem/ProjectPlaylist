import { Goal } from "@/@types/goal";
import { UserAccount } from "@/@types/userAccount";
import { FC } from "react";
import GoalModalEdit from "./GoalModalEdit";
import GoalModalDelete from "./GoalModalDelete";

interface GoalModalProps {
  goal: Goal;
  user: UserAccount;
  onClose: () => void;
  edit: boolean;
}

const GoalModalParent: FC<GoalModalProps> = ({ goal, user, onClose, edit }) => {
  if (!goal || !user) return null;

  return (
    <div>
      {edit ? (
        <GoalModalEdit goal={goal} onClose={onClose} />
      ) : (
        <GoalModalDelete goal={goal} onClose={onClose} />
      )}
    </div>
  );
};

export default GoalModalParent;
