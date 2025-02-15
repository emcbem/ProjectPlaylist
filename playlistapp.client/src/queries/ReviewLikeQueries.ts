import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { ReviewLikeService } from "@/ApiServices/ReviewLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/ReviewLikeKeys";
import reviewKeys from "@/QueryKeys/GameReviewKeys";
import { RemoveReviewLikeRequest } from "@/@types/Requests/DeleteRequests/removeReviewLikeRequest";
import { UpdateReviewLikeRequest } from "@/@types/Requests/UpdateRequests/updateReviewLikeRequest";
import { GetReviewLikeRequest } from "@/@types/Requests/GetRequests/getReviewLikeRequest";

export const ReviewLikeQueries = {
  useAddReviewLike: (
    addReviewLikeRequest: AddReviewLikeRequest,
    gameReviewId: number,
    gameId: number
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => ReviewLikeService.addReviewLike(addReviewLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddReviewLike });
        queryClient.invalidateQueries({
          queryKey: keys.GetReviewLike(gameReviewId),
        });
        queryClient.invalidateQueries({
          queryKey: reviewKeys.GetAllGameReviewsByGame(gameId),
        });
      },
    });
    /*
      const addReviewLikeRequest: AddReviewLikeRequest = {
        gameReviewId: Number(gameReviewId),
        isLike: true,
        userId: usr?.guid ?? "",
    };

      const {
        mutate: AddReviewLike,
        data: newReviewLike,
        isPending: isAdding,
        isError: isAddingError,
        isSuccess: isAddingSuccess,
    } = ReviewLikeQueries.useAddReviewLike(addReviewLikeRequest);

      const handleAddReviewLike = () => {
        AddReviewLike();
    };
    */
  },
  useGetAllReviewLikesByUser: (userId: string) => {
    return useQuery({
      queryKey: keys.GetAllReviewLikesByUser,
      queryFn: () => ReviewLikeService.getAllReviewLikesByUser(userId),
    });
    /*
      const {
        data: allReviewLikes,
        isPending: isGetting,
        isError: isGettingError,
        isSuccess: isGettingSuccess,
    } = ReviewLikeQueries.useGetAllReviewLikesByUser(usr?.guid ?? "");
    */
  },
  useRemoveReviewLike: (
    removeReviewLikeRequest: RemoveReviewLikeRequest,
    gameReviewId: number,
    gameId: number
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        ReviewLikeService.removeReviewLike(removeReviewLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.RemoveReviewLike });
        queryClient.invalidateQueries({
          queryKey: keys.GetReviewLike(gameReviewId),
        });
        queryClient.invalidateQueries({
          queryKey: reviewKeys.GetAllGameReviewsByGame(gameId),
        });
      },
    });
    /*
      const removeReviewLikeRequest: RemoveReviewLikeRequest = {
        gameReviewId: Number(gameReviewId),
        userId: usr?.guid ?? "",
    };

      const {
        mutate: RemoveReviewLike,
        data: removedReviewLike,
        isPending: isDeleting,
        isError: isDeletingError,
        isSuccess: isDeletingSuccess,
    } = ReviewLikeQueries.useRemoveReviewLike(removeReviewLikeRequest);

      const handleDeleteReviewLike = () => {
        RemoveReviewLike();
    };
    */
  },
  useUpdateReviewLike: (
    updateReviewLikeRequest: UpdateReviewLikeRequest,
    gameReviewId: number,
    gameId: number
  ) => {
    const queryclient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        ReviewLikeService.updateReviewLike(updateReviewLikeRequest),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: keys.UpdateReviewLike });
        queryclient.invalidateQueries({
          queryKey: keys.GetReviewLike(gameReviewId),
        });
        queryclient.invalidateQueries({
          queryKey: reviewKeys.GetAllGameReviewsByGame(gameId),
        });
      },
    });
    /*
      const updateReviewLikeRequest: UpdateReviewLikeRequest = {
      gameReviewId: Number(gameReviewId),
      isLike: false,
      userId: usr?.guid ?? "",
    };

      const {
      mutate: UpdateReviewLike,
      data: updatedReviewLike,
      isPending: isUpdating,
      isError: isUpdatingError,
      isSuccess: isUpdatingSuccess,
    } = ReviewLikeQueries.useUpdateReviewLike(updateReviewLikeRequest);

      const handleUpdateReviewLike = () => {
      UpdateReviewLike();
    }
    */
  },
  useGetReviewLike: (
    getReviewLikeRequest: GetReviewLikeRequest,
    gameReviewId: number
  ) => {
    return useQuery({
      queryFn: () => ReviewLikeService.getReviewLike(getReviewLikeRequest),
      queryKey: keys.GetReviewLike(gameReviewId),
    });
    /*
      const getReviewLikeRequest: GetReviewLikeRequest = {
      gameReviewId: Number(gameReviewId),
      userId: usr?.guid ?? "",
    };

      const {
      data: reviewLike,
      isError: isFetchingError,
      isPending: isFetching,
      isSuccess: isFetchingSuccess,
    } = ReviewLikeQueries.useGetReviewLike(getReviewLikeRequest);
    */
  },
};
