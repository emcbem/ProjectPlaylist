import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserAccountKeys";
import { UserAccountService } from "@/ApiServices/UserAccountService";
import { AddUserRequest } from "@/@types/Requests/AddRequests/addUserRequest";
import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import toast from "react-hot-toast";

export const UserAccountQueries = {
  useGetUserByUsername: (name: string) => {
    return useQuery({
      queryFn: () => UserAccountService.GetUserByUsername(name),
      queryKey: keys.GetUserByUsername,
    });
  },
  useGetUserBySearch: (query: string) => {
    return useQuery({
      queryFn: () => UserAccountService.GetUsersByQueryString(query),
      queryKey: keys.GetUsersBySearchQuery(query),
    });
  },
  useGetUserByAuthId: (authId: string) => {
    return useQuery({
      queryFn: () => UserAccountService.GetUserByAuthId(authId),
      queryKey: keys.GetUserByAuthId,
    });
  },
  useGetUserById: (userId: string) => {
    return useQuery({
      queryFn: () => UserAccountService.GetUserById(userId),
      queryKey: keys.GetUserByUserId(userId),
    });
  },
  useUpdateUser: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (updateUserRequest: UpdateUserRequest) =>
        UserAccountService.UpdateUser(updateUserRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateUser });
        queryClient.invalidateQueries({ queryKey: keys.GetUserByAuthId });
        toast.success("User updated");
      },
    });
  },
  useDeleteUser: (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserAccountService.DeleteUser(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUser });
      },
    });
  },
  useAddUserStrike: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (userGuid: string) =>
        UserAccountService.AddUserStrike(userGuid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateUser });
        queryClient.invalidateQueries({ queryKey: keys.GetUserByAuthId });
        toast.success("User updated");
      },
    });
  },
};
