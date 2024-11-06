import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { UpdateGoalRequest } from "@/@types/Requests/UpdateRequests/updateGoalRequest";
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
    achievementId: 486,
    dateToAchieve: new Date(2025, 11, 29),
    isCurrent: true,
    userId: usr?.guid ?? "",
  };

  const updateGoalRequest: UpdateGoalRequest = {
    dateToAchieve: new Date(2026, 11, 29),
    id: Number(goalId),
    isComplete: true,
    isCurrent: false,
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

  const {
    data: updatedGoal,
    mutate: UpdateGoal,
    isPending: isUpdating,
    isError: isUpdatingError,
    isSuccess: isUpdatingSuccess,
  } = GoalQueries.useUpdateGoal(updateGoalRequest);

  const {
    data: deletedGoal,
    mutate: DeleteGoal,
    isPending: isDeleting,
    isError: isDeletingError,
    isSuccess: isDeletingSuccess,
  } = GoalQueries.useDeleteGoal(Number(goalId));

  const handleAddGoal = () => {
    AddNewGoal();
  };

  const handleUpdateGoal = () => {
    UpdateGoal();
  };

  const handleDeleteGoal = () => {
    DeleteGoal();
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
        <div>
          {isUpdating && <p>Updating goal...</p>}
          {isUpdatingSuccess && (
            <p>Updated Goal's still acitve: {String(updatedGoal?.isCurrent)}</p>
          )}
          {isUpdatingError && <p>Failed to update goal...</p>}
          <button onClick={handleUpdateGoal}>Update Goal {goalById?.id}</button>
        </div>
        <div>
          {isDeleting && <p>Deleting goal...</p>}
          {isDeletingSuccess && <p>Goal is deleted: {String(deletedGoal)}</p>}
          {isDeletingError && <p>Failed to delete goal...</p>}
          <button onClick={handleDeleteGoal}>Delete Goal {goalById?.id}</button>
        </div>
      </div>
    )
  );
};

export default TestPage;
