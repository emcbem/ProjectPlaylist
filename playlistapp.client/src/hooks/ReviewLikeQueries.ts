import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { ReviewLikeService } from "@/ApiServices/ReviewLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/ReviewLikeKeys";
import { RemoveReviewLikeRequest } from "@/@types/Requests/DeleteRequests/removeReviewLikeRequest";

export const ReviewLikeQueries = {
  useAddReviewLike: (addReviewLikeRequest: AddReviewLikeRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => ReviewLikeService.addReviewLike(addReviewLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddReviewLike });
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
  useRemoveReviewLike: (removeReviewLikeRequest: RemoveReviewLikeRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        ReviewLikeService.removeReviewLike(removeReviewLikeRequest),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: keys.RemoveReviewLike }),
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
};
