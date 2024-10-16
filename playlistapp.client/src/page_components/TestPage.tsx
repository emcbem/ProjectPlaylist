import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { UpdateUserAchievementRequest } from "@/@types/Requests/UpdateRequests/updateUserAchievementRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userAchievementId } = useParams<{ userAchievementId: string }>();
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const addUserAchievementRequest: AddUserAchievementRequest = {
    dateAchieved: new Date(),
    userGuid: usr?.guid ?? "",
    isSelfSubmitted: true,
    achievementId: Number(userAchievementId),
  };

  const updateUserAchievementRequest: UpdateUserAchievementRequest = {
    dateAchieved: new Date(),
    id: 3,
    isSelfSubmitted: true,
  };

  const {
    mutate,
    data: newUserAchievementId,
    isPending: isLoading,
    isError,
    isSuccess,
  } = UserAchievementQueries.useAddUserAchievement(addUserAchievementRequest);

  const {
    mutate: updateUserAchievement,
    data: updatedUserAchievement,
    isPending: isUpdating,
    isError: isUpdatingError,
    isSuccess: isUpdatingSuccess,
  } = UserAchievementQueries.useUpdateUserAchievement(
    updateUserAchievementRequest
  );

  const {
    mutate: deleteUserAchievement,
    data: deletedUserAchievement,
    isPending: isDeleting,
    isError: isDeletingError,
    isSuccess: isDeletingSuccess,
  } = UserAchievementQueries.useDeleteUserAchievement(3);

  const UserAchievementByAchievementId =
    UserAchievementQueries.useGetUserAchievementByAchievementId(
      Number(userAchievementId)
    ).data;

  const UserAchievementById =
    UserAchievementQueries.useGetUserAchievementById(3).data;

  const UserAchievementByUserId =
    UserAchievementQueries.useGetUserAchievementByUserId(
      "f776d4d8-a6f5-44db-9960-6165a1b1535d"
    ).data;

  const handleAddUserAchievement = () => {
    mutate();
  };

  const handleUpdateUserAchievement = () => {
    updateUserAchievement();
  };

  const handleDeleteUserAchievement = async () => {
    try {
      const result = await deleteUserAchievement(); // Capture the result
      console.log("Deletion result: ", result); // Log the result
    } catch (error) {
      console.error("Error deleting user achievement: ", error);
    }
  };

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isLoading && <p>Adding user achievement...</p>}
          {isSuccess && <p>New User Achievement Id: {newUserAchievementId}</p>}
          {isError && <p>Failed to add user achievement.</p>}
          <button onClick={handleAddUserAchievement}>
            Add User Achievement
          </button>
        </div>
        <div>
          User Achievements for achievement {userAchievementId}
          <div>
            {UserAchievementByAchievementId?.map((x) => (
              <div key={x.achievement.id}>
                {x.achievement.id}: {x.achievement.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>
            User Achievement at id 3: {UserAchievementById?.achievement.name}
          </p>
        </div>
        <div>
          User Achievements for f776d4d8-a6f5-44db-9960-6165a1b1535d
          <div>
            {UserAchievementByUserId?.map((x) => (
              <div key={x.achievement.id}>
                {x.achievement.id}: {x.achievement.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          {isUpdating && <p>Updating user achievement...</p>}
          {isUpdatingSuccess && (
            <p>
              New User Achievement Date:{" "}
              {updatedUserAchievement?.dateAchieved.toString()}
            </p>
          )}
          {isUpdatingError && <p>Failed to update user achievement.</p>}
          <button onClick={handleUpdateUserAchievement}>
            Update User Achievement
          </button>
        </div>
        <div>
          {isDeleting && <p>Deleting user achievement...</p>}
          {isDeletingSuccess && (
            <p>
              User Achievement deleted successfully:{" "}
              {deletedUserAchievement.toString()}
            </p>
          )}
          {isDeletingError && <p>Failed to delete user achievement.</p>}
          <button onClick={handleDeleteUserAchievement}>
            Delete User Achievement
          </button>
        </div>
      </div>
    )
  );
};

export default TestPage;
