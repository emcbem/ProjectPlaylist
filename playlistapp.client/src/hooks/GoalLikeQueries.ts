import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import { GoalLikeService } from "@/ApiServices/GoalLikeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "../QueryKeys/GoalLikeKeys";

export const GoalLikeQueries = {
  useAddGoalLike: (addGoalLikeRequest: AddGoalLikeRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalLikeService.addGoalLike(addGoalLikeRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddGoalLike });
      },
    });
  },
};
