import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import { RemoveGoalLikerequest } from "@/@types/Requests/DeleteRequests/removeGoalLikeRequest";
import { GetGoalLikeRequest } from "@/@types/Requests/GetRequests/getGoalLikeRequest";
import { UpdateGoalLikeRequest } from "@/@types/Requests/UpdateRequests/updateGoalLikeRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalLikeQueries } from "@/queries/GoalLikeQueries";
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

  const AddGoalLikeRequest: AddGoalLikeRequest = {
    goalId: Number(goalId),
    isLike: true,
    userId: usr?.guid ?? "",
  };

  const GetGoalLikeRequest: GetGoalLikeRequest = {
    goalId: Number(goalId),
    userId: usr?.guid ?? "",
  };

  const updateGoalLikeRequest: UpdateGoalLikeRequest = {
    id: 1,
    isLike: false,
  };

  const removeGoalLikeRequest: RemoveGoalLikerequest = {
    goalId: Number(goalId),
    userId: usr?.guid ?? "",
  };


  const {
    data: newGoalLike,
    mutate: AddGoalLike,
    isPending: isAdding,
    isError: isAddingError,
    isSuccess: isAddingSuccess,
  } = GoalLikeQueries.useAddGoalLike(AddGoalLikeRequest);

  const {
    data: goalLikesFromUser,
    isPending: isGettingFromUser,
    isError: isGettingFromUserError,
    isSuccess: isGettingFromUserSuccess,
  } = GoalLikeQueries.useGetGoalLikesFromUser(usr?.guid ?? "");

  const {
    data: goalLike,
    mutate: GetGoalLike,
    isPending: isGettingGoalLike,
    isError: isGettingGoalLikeError,
    isSuccess: isGettinggoalLikeSuccess,
  } = GoalLikeQueries.useGetGoalLike(GetGoalLikeRequest);

  const {
    data: updatedGoalLike,
    mutate: UpdateGoalLike,
    isPending: isUpdating,
    isError: isUpdatingError,
    isSuccess: isUpdatingSuccess,
  } = GoalLikeQueries.useUpdateGoalLike(updateGoalLikeRequest);

  const {
    data: removedGoalLike,
    mutate: RemoveGoalLike,
    isPending: isRemoving,
    isError: isRemovingError,
    isSuccess: isRemovingSuccess,
  } = GoalLikeQueries.useRemoveGoalLike(removeGoalLikeRequest);

  const handleAddGoalLike = () => {
    AddGoalLike();
  };

  const handleGetGoalLike = () => {
    GetGoalLike();
  };

  const handleUpdateGoalLike = () => {
    UpdateGoalLike();
  };

  const handleRemoveGoalLike = () => {
    RemoveGoalLike();
  };

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isAdding && <p>Adding goal like...</p>}
          {isAddingSuccess && <p>Goal is liked: {String(newGoalLike)}</p>}
          {isAddingError && <p>Failed to add goal to like...</p>}
          <button onClick={handleAddGoalLike}>Add Goal</button>
        </div>
        <div>
          {isGettingFromUser && (
            <p>Getting all like goals for user {usr?.username}...</p>
          )}
          {isGettingFromUserSuccess && (
            <div>
              {goalLikesFromUser.map((x) => (
                <div key={x.id}>
                  {x.id}: Goal: {x.achievement.name}, Goal Date:{" "}
                  {formatDate(x.dateToAchieve)}
                </div>
              ))}
              {isGettingFromUserError && (
                <p>Failed to get goals user has liked</p>
              )}
            </div>
          )}
        </div>
        <div>
          {isGettingGoalLike && <p>Getting goal like...</p>}
          {isGettinggoalLikeSuccess && (
            <p>Goal Like: {formatDate(goalLike.dateLiked)}</p>
          )}
          {isGettingGoalLikeError && <p>Failed to get goal like...</p>}
          <button onClick={handleGetGoalLike}>Get Goal Like</button>
        </div>
        <div>
          {isUpdating && <p>Updating goal like...</p>}
          {isUpdatingSuccess && (
            <p>Is goal like updated: {String(updatedGoalLike)}</p>
          )}
          {isUpdatingError && <p>Failed to update goal like...</p>}
          <button onClick={handleUpdateGoalLike}>Update Goal Like</button>
        </div>
        <div>
          {isRemoving && <p>Removing goal like...</p>}
          {isRemovingSuccess && (
            <p>Is goal like removed: {String(removedGoalLike)}</p>
          )}
          {isRemovingError && <p>Failed to remove goal like...</p>}
          <button onClick={handleRemoveGoalLike}>Remove Goal Like</button>
        </div>
      </div>
    )
  );
};

export default TestPage;
