import React, { useState } from "react";
import GoalCard from "./ViewSingleGoal";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/queries/GoalQueries";
import { Goal } from "@/@types/goal";
import GoalModalParent from "./Components/Modal/GoalModalParent";
import LoadingPage from "@/individual_components/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import BlackButton from "@/components/ui/BlackButton";

const ViewAllGoals = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal>();

  const navigate = useNavigate();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const userId = id ?? usr?.guid;

  const { data: userGoals } = GoalQueries.useGetGoalsByUser(userId ?? "");
  const filteredGoals = userGoals?.sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) {
      return b.isCurrent ? 1 : -1;
    }

    return (
      new Date(a.dateToAchieve).getTime() - new Date(b.dateToAchieve).getTime()
    );
  });

  const OpenEditModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsEditModalOpen(true);
  };

  const OpenDeleteModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDeleteModalOpen(true);
  };

  const CloseModal = () => {
    setSelectedGoal(undefined);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  if (!usr || !filteredGoals || !userGoals) {
    return <LoadingPage />;
  }

  if (filteredGoals.length === 0) {
    return (
      <div className="flex flex-col items-center content-center mt-8">
        <div className="text-center max-w-lg">
          <h6 className="text-center text-black dark:text-white font-bold text-xl">
            No goals found for {id ? "this" : "your"} account
          </h6>
          {!id && (
            <p className="text-center text-black dark:text-white">
              Add a goal to one of your games from your library!
            </p>
          )}

          {!id && (
            <div className="flex justify-center mt-2">
              <BlackButton onClick={() => navigate("/library")}>
                Go to Library
              </BlackButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    usr &&
    filteredGoals &&
    userGoals && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="w-full" style={{ maxWidth: "1200px" }}>
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="">
              <GoalCard
                goal={goal}
                onEditClick={() => OpenEditModal(goal)}
                onDeleteClick={() => OpenDeleteModal(goal)}
              ></GoalCard>
            </div>
          ))}
          {isEditModalOpen && selectedGoal && (
            <GoalModalParent
              user={usr}
              onClose={CloseModal}
              goal={selectedGoal}
              edit={true}
            ></GoalModalParent>
          )}
          {isDeleteModalOpen && selectedGoal && (
            <GoalModalParent
              user={usr}
              onClose={CloseModal}
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
