import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
import { UserAchievementLikeService } from "@/ApiServices/UserAchievementLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserAchievementLikeKeys";
import { RemoveUserAchievementLikeRequest } from "@/@types/Requests/DeleteRequests/removeUserAchievementLikeRequest";

export const UserAchievementLikeQueries = {
  useAddUserAchievementLike: (
    addUserAchievementLikeRequest: AddUserAchievementLikeRequest
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementLikeService.AddUserAchievementLike(
          addUserAchievementLikeRequest
        ),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: keys.AddUserAchievementLike,
        }),
    });
  },
  useGetUserAchievementLikesFromUserId: (userId: string) => {
    return useQuery({
      queryKey: keys.GetUserAchievementLikeFromUserId,
      queryFn: () =>
        UserAchievementLikeService.GetUserAchievementLikesFromUserId(userId),
    });
  },
  useRemoveAchievementLike: (
    removeUserAchievementLikeRequest: RemoveUserAchievementLikeRequest
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementLikeService.RemoveUserAchievementLike(
          removeUserAchievementLikeRequest
        ),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: keys.RemoveAchievementLike,
        }),
    });
  },
};
