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
    /*
    const addGoalRequest: AddGoalRequest = {
      achievementId: achievementId,
      dateToAchieve: date,
      isCurrent: bool,
      userId: usr?.guid ?? "",
    };

    const {
      data: newGoal,
      mutate: AddNewGoal,
      isPending: isAdding,
      isError: isAddingError,
      isSuccess: isAddingSuccess,
    } = GoalQueries.useAddGoal(addGoalRequest);

    const handleAddGoal = () => {
      AddNewGoal();
    };
    */
  },
  useGetGoalById: (goalId: number) => {
    return useQuery({
      queryFn: () => GoalService.getGoalById(goalId),
      queryKey: keys.GetGoalById(goalId),
    });
    /*
    const {
      data: goalById,
      isPending: isGettingGoalById,
      isError: isGettingGoalByIdError,
      isSuccess: isGettingGoalByIdSuccess,
    } = GoalQueries.useGetGoalById(Number(goalId));
    */
  },
  useGetGoalsByUser: (userId: string) => {
    return useQuery({
      queryFn: () => GoalService.getGoalsFromUser(userId),
      queryKey: keys.GetGoalsByUser(userId),
    });
    /*
    const {
      data: goalsByUser,
      isPending: isGettingGoalsByUser,
      isError: isGettingGoalsByUserError,
      isSuccess: isGettingGoalsByUserSuccess,
    } = GoalQueries.useGetGoalsByUser(userId);
    */
  },
  useUpdateGoal: (updateGoalRequest: UpdateGoalRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalService.updateGoal(updateGoalRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateGoal });
      },
    });
    /*
    const updateGoalRequest: UpdateGoalRequest = {
      dateToAchieve: date,
      id: Number(goalId),
      isComplete: bool,
      isCurrent: bool,
    };

    const {
      data: updatedGoal,
      mutate: UpdateGoal,
      isPending: isUpdating,
      isError: isUpdatingError,
      isSuccess: isUpdatingSuccess,
    } = GoalQueries.useUpdateGoal(updateGoalRequest);

    const handleUpdateGoal = () => {
      UpdateGoal();
    };
    */
  },
  useDeleteGoal: (goalId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GoalService.deleteGoal(goalId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteGoal(goalId) });
      },
    });
    /*
    const {
      data: deletedGoal,
      mutate: DeleteGoal,
      isPending: isDeleting,
      isError: isDeletingError,
      isSuccess: isDeletingSuccess,
    } = GoalQueries.useDeleteGoal(Number(goalId));

    const handleDeleteGoal = () => {
      DeleteGoal();
    };
    */
  },
};
