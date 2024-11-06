import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import formatDate from "@/lib/date";
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
    achievementId: 38456,
    dateToAchieve: new Date(2025, 11, 29),
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

  const {
    data: goalsByUser,
    isPending: isGettingGoalsByUser,
    isError: isGettingGoalsByUserError,
    isSuccess: isGettingGoalsByUserSuccess,
  } = GoalQueries.useGetGoalsByUser("f776d4d8-a6f5-44db-9960-6165a1b1535d");

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
          {isGettingGoalByIdSuccess && (
            <p>
              Viewing goal: {goalById.id}, for achievement:{" "}
              {goalById.achievement.name}
            </p>
          )}
          {isGettingGoalByIdError && <p>Failed to get goal by id</p>}
        </div>
        <div>
          {isGettingGoalsByUser && (
            <p>Getting all goals for user {usr?.username}...</p>
          )}
          {isGettingGoalsByUserSuccess && (
            <div>
              {goalsByUser.map((x) => (
                <div key={x.id}>
                  {x.id}: Achievement: {x.achievement.name}, Goal Date:{" "}
                  {formatDate(x.dateToAchieve)}
                </div>
              ))}
            </div>
          )}
          {isGettingGoalsByUserError && <p>Failed to get goals for user</p>}
        </div>
      </div>
    )
  );
};

export default TestPage;
