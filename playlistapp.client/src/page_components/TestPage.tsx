import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { goalId } = useParams<{ goalId: string }>();

  const addGoalRequest: AddGoalRequest = {
    achievementId: 102,
    dateToAchieve: new Date(12 / 29 / 2025),
    isCurrent: true,
    userId: usr?.guid ?? "",
  };

  const {
    data: newGoal,
    mutate: AddNewGoal,
    isPending: isAdding,
    isError: isAddingError,
    isSuccess: isAddingSuccess,
  } = GoalQueries.useAddGoal(addGoalRequest);

  const {
    data: goalById,
    isPending: isGettingGoalById,
    isError: isGettingGoalByIdError,
    isSuccess: isGettingGoalByIdSuccess,
  } = GoalQueries.useGetGoalById(Number(goalId));

  const handleAddGoal = () => {
    AddNewGoal();
  };

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isAdding && <p>Adding goal...</p>}
          {isAddingSuccess && <p>New Goal's Id: {newGoal}</p>}
          {isAddingError && <p>Failed to add new goal...</p>}
          <button onClick={handleAddGoal}>Add New Goal</button>
        </div>
        <div>
          {isGettingGoalById && <p>Getting goal by id...</p>}
          {isGettingGoalByIdSuccess && <p>Viewing goal: {goalById.id}, for achievement: {goalById.achievement.name}</p>}
          {isGettingGoalByIdError && <p>Failed to get goal by id</p>}
        </div>
      </div>
    )
  );
};

export default TestPage;
