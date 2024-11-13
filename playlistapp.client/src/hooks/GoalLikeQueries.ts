import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import { GoalLikeService } from "@/ApiServices/GoalLikeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "../QueryKeys/GoalLikeKeys";
import { GetGoalLikeRequest } from "@/@types/Requests/GetRequests/getGoalLikeRequest";

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
  useGetGoalLikesFromUser: (userId: string) => {
    return useQuery({
      queryFn: () => GoalLikeService.getGoalLikesFromUser(userId),
      queryKey: keys.GetGoalLikesFromUser(userId),
    });
  },
  useGetGoalLike: (getGoalLikeRequest: GetGoalLikeRequest) => {
    const queryclient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalLikeService.getGoalLike(getGoalLikeRequest),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: keys.GetGoalLike });
      },
    });
  },
};
