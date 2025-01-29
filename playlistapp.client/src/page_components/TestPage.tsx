import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { SteamQueries } from "@/queries/SteamQueries";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: games } =
    SteamQueries.useGetUserDataForOneGame("");

  console.log("STEAM DATA", games);

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>{games}</div>
        {/* <div>
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
        </div> */}
      </div>
    )
  );
};

export default TestPage;
