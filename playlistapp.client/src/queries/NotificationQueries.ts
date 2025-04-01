import { updateNotificationRequest } from "@/@types/Requests/UpdateRequests/updateNotificationRequest";
import { NotificationService } from "@/ApiServices/NotificationService";
import keys from "@/QueryKeys/UserAccountKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const NotificationQueries = {
  useUpdateNotification: () => {
    const query = useQueryClient();
    return useMutation({
      mutationFn: (updateRequest: updateNotificationRequest) => {
        return NotificationService.UpdateNotification(updateRequest);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: keys.GetUserByAuthId });
      },
    });
  },
  useRemoveNotification: () => {
    const query = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => {
        return NotificationService.RemoveNotification(id);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: keys.GetUserByAuthId });
      },
    });
  },
  useDeleteAllNotification: () => {
    const query = useQueryClient();
    return useMutation({
      mutationFn: (userId: number) => {
        return NotificationService.DeleteAllNotifications(userId);
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: keys.GetUserByAuthId });
      },
    });
  },
};
