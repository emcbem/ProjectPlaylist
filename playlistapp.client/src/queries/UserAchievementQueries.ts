import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { UserAchievementService } from "@/ApiServices/UserAchievementService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserAchievementKeys";
import { UpdateUserAchievementRequest } from "@/@types/Requests/UpdateRequests/updateUserAchievementRequest";
import { GetClaimedAchievementsForGameForUserRequest } from "@/@types/Requests/GetRequests/getClaimedAchievementsForGameForUserRequest";

export const UserAchievementQueries = {
  useAddUserAchievement: (
    addUserAchievementRequest: AddUserAchievementRequest,
    userId: string
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementService.AddUserAchievement(addUserAchievementRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddUserAchievement });
        queryClient.invalidateQueries({
          queryKey: keys.GetUserAchievementByUserId(userId),
        });
      },
      onError: (error) => {
        console.error("Error adding user achievement:", error);
      },
    });
    /*
      const addUserAchievementRequest: AddUserAchievementRequest = {
      dateAchieved: new Date(),
      userGuid: usr?.guid ?? "",
      isSelfSubmitted: true,
      achievementId: Number(userAchievementId),
      };

      const {
      mutate,
      data: newUserAchievementId,
      isPending: isLoading,
      isError,
      isSuccess,
      } = UserAchievementQueries.useAddUserAchievement(addUserAchievementRequest);

      const handleAddUserAchievement = () => {
      mutate();
      };
    */
  },
  useGetUserAchievementByAchievementId: (achievementId: number) => {
    return useQuery({
      queryKey: keys.GetUserAchievementByAchievementId,
      queryFn: () =>
        UserAchievementService.GetUserAchievementByAchievementId(achievementId),
      enabled: !!achievementId,
    });
    /*
      const UserAchievementByAchievementId =
      UserAchievementQueries.useGetUserAchievementByAchievementId(
      Number(userAchievementId)
      ).data;
    */
  },
  useGetUserAchievementById: (userAchievementId: number) => {
    return useQuery({
      queryKey: keys.GetUserAchievementById,
      queryFn: () =>
        UserAchievementService.GetUserAchievementById(userAchievementId),
      enabled: !!userAchievementId,
    });
    /*
      const UserAchievementById =
      UserAchievementQueries.useGetUserAchievementById(userAchievementId).data;
    */
  },
  useGetUserAchievementByUserId: (userId: string) => {
    return useQuery({
      queryKey: keys.GetUserAchievementByUserId(userId),
      queryFn: () => UserAchievementService.GetUserAchievementByUserId(userId),
      enabled: !!userId,
    });
    /*
      const UserAchievementByUserId =
      UserAchievementQueries.useGetUserAchievementByUserId(userGuid).data;
    */
  },
  useUpdateUserAchievement: (
    updateUserAchievementRequest: UpdateUserAchievementRequest
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementService.UpdateUserAchievement(
          updateUserAchievementRequest
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateUserAchievement });
      },
      onError: (error) => {
        console.error("Error updating user achievement: ", error);
      },
    });
    /*
      const {
      mutate: updateUserAchievement,
      data: updatedUserAchievement,
      isPending: isUpdating,
      isError: isUpdatingError,
      isSuccess: isUpdatingSuccess,
      } = UserAchievementQueries.useUpdateUserAchievement(
      updateUserAchievementRequest

      const handleUpdateUserAchievement = () => {
      updateUserAchievement();
      };
  );
    */
  },
  useDeleteUserAchievement: (userAchievementId: number, userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementService.DeleteUserAchievement(userAchievementId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUserAchievement });
        queryClient.invalidateQueries({
          queryKey: keys.GetUserAchievementByUserId(userId),
        });
      },
    });
  },
  useGetClaimedAchievementsForGameForUser: (
    getClaimedAchievementsRequest: GetClaimedAchievementsForGameForUserRequest
  ) => {
    return useQuery({
      queryFn: () =>
        UserAchievementService.GetClaimedAchievementsForGameForUser(
          getClaimedAchievementsRequest
        ),
      queryKey: keys.GetClaimedAchievements,
    });
  },
};
