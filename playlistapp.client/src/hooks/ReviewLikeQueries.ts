import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { ReviewLikeService } from "@/ApiServices/ReviewLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/ReviewLikeKeys";

export const ReviewLikeQueries = {
  useAddReviewLike: (addReviewLikeRequest: AddReviewLikeRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => ReviewLikeService.addReviewLike(addReviewLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddReviewLike });
      },
    });
  },
  useGetAllReviewLikesByUser: (userId: string) => {
    return useQuery({
      queryKey: keys.GetAllReviewLikesByUser,
      queryFn: () => ReviewLikeService.getAllReviewLikesByUser(userId),
    });
  },
};
