import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { ReviewLikeService } from "@/ApiServices/ReviewLikeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/ReviewLikeKeys";

export const ReivewLikeQueries = {
  useAddReviewLike: (addReviewLikeRequest: AddReviewLikeRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => ReviewLikeService.addReviewLike(addReviewLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddReviewLike });
      },
    });
  },
};
