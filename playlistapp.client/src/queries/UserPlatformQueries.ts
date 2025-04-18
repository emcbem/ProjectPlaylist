import { AddUserPlatformRequest } from "@/@types/Requests/AddRequests/addUserPlatformRequest";
import { UpdateUserPlatformRequest } from "@/@types/Requests/UpdateRequests/UpdateUserPlatformRequest";
import { UserPlatformService } from "@/ApiServices/UserPlatformService";
import UserPlatformKeys from "@/QueryKeys/UserPlatformKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UserPlatformQueries = {
  GetAllByUser: (userGuid: string) => {
    return useQuery({
      queryFn: () => UserPlatformService.GetAllByUser(userGuid),
      queryKey: UserPlatformKeys.GetByUserKey(userGuid),
    });
  },
  UpdateUserPlatform: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (request: UpdateUserPlatformRequest) =>
        UserPlatformService.UpdateUserPlatform(request),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: UserPlatformKeys.MutatePlatformKey,
        });
      },
    });
  },
  AddUserPlatform: (userGuid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (request: AddUserPlatformRequest) =>
        UserPlatformService.AddUserPlatform(request),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: UserPlatformKeys.GetByUserKey(userGuid),
        });
      },
    });
  },
  DeleteUserPlatform: (userGuid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (userPlatformId: number) =>
        UserPlatformService.DeleteUserPlatform(userPlatformId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: UserPlatformKeys.GetByUserKey(userGuid),
        });
      },
    });
  },
};
