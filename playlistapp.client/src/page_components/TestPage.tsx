import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalLikeQueries } from "@/hooks/GoalLikeQueries";
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

  const handleAddGoalLike = () => {
    AddGoalLike();
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
      </div>
    )
  );
};

export default TestPage;
