import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { GoalService } from "@/ApiServices/GoalService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/GoalKeys";
import { UpdateGoalRequest } from "@/@types/Requests/UpdateRequests/updateGoalRequest";

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
      queryKey: keys.GetGoalById(goalId),
    });
  },
  useGetGoalsByUser: (userId: string) => {
    return useQuery({
      queryFn: () => GoalService.getGoalsFromUser(userId),
      queryKey: keys.GetGoalsByUser(userId),
    });
  },
  useUpdateGoal: (updateGoalRequest: UpdateGoalRequest, userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalService.updateGoal(updateGoalRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.GetGoalsByUser(userId),
        });
      },
    });
  },
  useDeleteGoal: (goalId: number, userGuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalService.deleteGoal(goalId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.GetGoalsByUser(userGuid) });
      },
    });
  },
};
