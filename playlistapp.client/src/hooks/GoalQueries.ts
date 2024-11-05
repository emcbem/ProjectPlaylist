import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { GoalService } from "@/ApiServices/GoalService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/GoalKeys";

export const GoalQueries = {
  useAddGoal: (addGoalRequest: AddGoalRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalService.addGoal(addGoalRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddGoal });
      },
    });
  },
  useGetGoalById: (goalId: number) => {
    return useQuery({
        queryFn: () => GoalService.getGoalById(goalId),
        queryKey: keys.GetGoalById
    })
  }
};
