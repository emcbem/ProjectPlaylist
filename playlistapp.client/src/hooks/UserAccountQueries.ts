import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserAccountKeys";
import { UserAccountService } from "@/ApiServices/UserAccountService";
import { AddUserRequest } from "@/@types/Requests/AddRequests/addUserRequest";
import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";

export const UserAccountQueries = {
  useGetUserByUsername: (name: string) => {
    return useQuery({
      queryFn: () => UserAccountService.GetUserByUsername(name),

      queryKey: keys.GetUserByUsername,
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
      queryKey: keys.GetUserByUserId,
    });
  },
  useAddNewUser: (addUserRequest: AddUserRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserAccountService.AddNewUser(addUserRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddNewUser });
      },
    });
  },
  useUpdateUser: (updateUserRequest: UpdateUserRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserAccountService.UpdateUser(updateUserRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateUser });
      },
    });
  },
  useDeleteUser: (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserAccountService.DeleteUser(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUser });
      },
    });
  },
};
