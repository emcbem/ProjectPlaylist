import React, { useState } from "react";
import GoalCard from "./ViewSingleGoal";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import { Goal } from "@/@types/goal";
import GoalModalParent from "./Components/Modal/GoalModalParent";

const ViewAllGoals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal>();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: userGoals } = GoalQueries.useGetGoalsByUser(usr?.guid ?? "");

  const openModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGoal(undefined);
    setIsModalOpen(false);
  };

  return (
    usr &&
    userGoals && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="w-full" style={{ maxWidth: "1200px" }}>
          {userGoals.map((goal) => (
            <div key={goal.id} className="">
              <GoalCard
                goal={goal}
                onEditClick={() => openModal(goal)}
              ></GoalCard>
            </div>
          ))}
          {isModalOpen && selectedGoal && (
            <GoalModalParent
              user={usr}
              onClose={closeModal}
              goal={selectedGoal}
            ></GoalModalParent>
          )}
        </div>
      </div>
    )
  );
};

export default ViewAllGoals;
