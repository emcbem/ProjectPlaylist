import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
import { RemoveUserAchievementLikeRequest } from "@/@types/Requests/DeleteRequests/RemoveUserAchievementLikeRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementLikeQueries } from "@/hooks/UserAchievementLikeQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userAchievementId } = useParams<{ userAchievementId: string }>();
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const addUserAchievementLikeRequest: AddUserAchievementLikeRequest = {
    userAchievementId: Number(userAchievementId),
    userId: usr?.guid ?? "",
    isLike: true,
  };

  const removeUserAchievementLikeRequest: RemoveUserAchievementLikeRequest = {
    userAchievementId: Number(userAchievementId),
    userId: usr?.guid ?? "",
  };

  const {
    mutate: adduserAchievementLike,
    data: newUserAchievementLike,
    isPending: isAdding,
    isError: isAddingError,
    isSuccess: isAddingSuccess,
  } = UserAchievementLikeQueries.useAddUserAchievementLike(
    addUserAchievementLikeRequest
  );

  const {
    data: userAchievementLikes,
    isPending: isFetching,
    isError: isFetchingError,
    isSuccess: isFetchingSuccess,
  } = UserAchievementLikeQueries.useGetUserAchievementLikesFromUserId(
    usr?.guid ?? ""
  );

  const {
    mutate: removeAchievementLike,
    data: oldUserAchievementLike,
    isPending: isRemoving,
    isError: isRemovingError,
    isSuccess: isRemovingSuccess,
  } = UserAchievementLikeQueries.useRemoveAchievementLike(
    removeUserAchievementLikeRequest
  );

  const handleAddUserAchievementLike = () => {
    adduserAchievementLike();
  };

  const handleRemoveUserAchievementLike = () => {
    removeAchievementLike();
  }

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isAdding && <p>Adding like to achievement...</p>}
          {isAddingSuccess && <p>Is liked: {String(newUserAchievementLike)}</p>}
          {isAddingError && <p>Failed to add like to achievement.</p>}
          <button onClick={handleAddUserAchievementLike}>
            Add Like to Achievement
          </button>
        </div>
        <div>
          {isRemoving && <p>Removing like on achievement...</p>}
          {isRemovingSuccess && <p>Is removed: {String(oldUserAchievementLike)}</p>}
          {isRemovingError && <p>Failed to remove like on achievement.</p>}
          <button onClick={handleRemoveUserAchievementLike}>
            Remove Like on Achievement
          </button>
        </div>
        <div>
          {isFetching && (
            <p>Fetching all achievement likes for {usr?.username}...</p>
          )}
          {isFetchingSuccess && (
            <div>
              {userAchievementLikes?.map((x) => (
                <div key={x.id}>
                  {x.id}: {x.achievement.name}
                </div>
              ))}
            </div>
          )}
          {isFetchingError && <p>Failed to get achievement likes.</p>}
        </div>
      </div>
    )
  );
};

export default TestPage;
