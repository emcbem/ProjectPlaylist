import React, { useState } from "react";
import GoalCard from "./ViewSingleGoal";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import { Goal } from "@/@types/goal";
import GoalModalParent from "./Components/Modal/GoalModalParent";

const ViewAllGoals = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal>();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: userGoals } = GoalQueries.useGetGoalsByUser(usr?.guid ?? "");
  const filteredGoals = userGoals?.sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) {
      return b.isCurrent ? 1 : -1;
    }

    return (
      new Date(a.dateToAchieve).getTime() - new Date(b.dateToAchieve).getTime()
    );
  });

  const openEditModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGoal(undefined);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    usr &&
    filteredGoals && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="w-full" style={{ maxWidth: "1200px" }}>
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="">
              <GoalCard
                goal={goal}
                onEditClick={() => openEditModal(goal)}
                onDeleteClick={() => openDeleteModal(goal)}
              ></GoalCard>
            </div>
          ))}
          {isEditModalOpen && selectedGoal && (
            <GoalModalParent
              user={usr}
              onClose={closeModal}
              goal={selectedGoal}
              edit={true}
            ></GoalModalParent>
          )}
          {isDeleteModalOpen && selectedGoal && (
            <GoalModalParent
              user={usr}
              onClose={closeModal}
              goal={selectedGoal}
              edit={false}
            ></GoalModalParent>
          )}
        </div>
      </div>
    )
  );
};

export default ViewAllGoals;
