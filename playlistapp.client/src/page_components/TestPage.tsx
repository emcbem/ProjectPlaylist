import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

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

  const handleAddGoal = () => {
    AddNewGoal();
  }

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
      </div>
    )
  );
};

export default TestPage;
