import { Goal } from "@/@types/goal";
import { UserAccount } from "@/@types/userAccount";
import { FC } from "react";
import GoalModalEdit from "./GoalModalEdit"; 

interface GoalModalProps {
  goal: Goal;
  user: UserAccount;
  onClose: () => void; 
}

const GoalModalParent: FC<GoalModalProps> = ({ goal, user, onClose }) => {
  if (!goal || !user) return null;

  return (
    <div>
      <GoalModalEdit goal={goal} onClose={onClose} />
    </div>
  );
};

export default GoalModalParent;
