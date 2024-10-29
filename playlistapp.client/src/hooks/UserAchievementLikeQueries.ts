import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
import { UserAchievementLikeService } from "@/ApiServices/UserAchievementLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserAchievementLikeKeys";
import { RemoveUserAchievementLikeRequest } from "@/@types/Requests/DeleteRequests/removeUserAchievementLikeRequest";
import { UpdateUserAchievementLikeRequest } from "@/@types/Requests/UpdateRequests/updateUserAchievementLikeRequest";
import { GetUserAchievementLikeRequest } from "@/@types/Requests/GetRequests/getUserAchievementLike";

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
    /*
      const addUserAchievementLikeRequest: AddUserAchievementLikeRequest = {
      userAchievementId: Number(userAchievementId),
      userId: usr?.guid ?? "",
      isLike: true,
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

      const handleAddUserAchievementLike = () => {
      adduserAchievementLike();
    };
    */
  },
  useGetUserAchievementLikesFromUserId: (userId: string) => {
    return useQuery({
      queryKey: keys.GetUserAchievementLikeFromUserId,
      queryFn: () =>
        UserAchievementLikeService.GetUserAchievementLikesFromUserId(userId),
    });
    /*
      const {
      data: userAchievementLikes,
      isPending: isFetching,
      isError: isFetchingError,
      isSuccess: isFetchingSuccess,
    } = UserAchievementLikeQueries.useGetUserAchievementLikesFromUserId(
      usr?.guid ?? ""
    );
    */
  },
  useRemoveUserAchievementLike: (
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
          queryKey: keys.RemoveUserAchievementLike,
        }),
    });
    /*
      const removeUserAchievementLikeRequest: RemoveUserAchievementLikeRequest = {
      userAchievementId: Number(userAchievementId),
      userId: usr?.guid ?? "",
    };

      const {
      mutate: removeAchievementLike,
      data: oldUserAchievementLike,
      isPending: isRemoving,
      isError: isRemovingError,
      isSuccess: isRemovingSuccess,
    } = UserAchievementLikeQueries.useRemoveUserAchievementLike(
      removeUserAchievementLikeRequest
    );

      const handleRemoveUserAchievementLike = () => {
      removeAchievementLike();
    };
    */
  },
  useUpdateUserAchievementLike: (
    updateUserAchievementLikeRequest: UpdateUserAchievementLikeRequest
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        UserAchievementLikeService.UpdateUserAchievementLike(
          updateUserAchievementLikeRequest
        ),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: keys.UpdateUserAchievementLike,
        }),
    });
    /*
      const updateUserAchievementLikeRequest: UpdateUserAchievementLikeRequest = {
      userAchievementId: Number(userAchievementId),
      userId: usr?.guid ?? "",
      isLike: false,
    };

      const {
      mutate: updateAchievementLike,
      data: updatedAchievementLike,
      isPending: isUpdating,
      isError: isUpdatingError,
      isSuccess: isUpdatingSuccess,
    } = UserAchievementLikeQueries.useUpdateUserAchievementLike(
      updateUserAchievementLikeRequest
    );

      const handleUpdateUserAchievementLike = () => {
      updateAchievementLike();
    }
    */
  },
  useGetuserAchievementLike: (
    getUserAchievementLikeRequest: GetUserAchievementLikeRequest
  ) => {
    return useQuery({
      queryFn: () =>
        UserAchievementLikeService.GetUserAchievementLike(
          getUserAchievementLikeRequest
        ),
      queryKey: keys.GetUserAchievementLike,
    });
  },
};
