import { AcceptFriendRequest } from "@/@types/Requests/AddRequests/acceptFriendRequest";
import { FriendService } from "@/ApiServices/FriendService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import keys from "../QueryKeys/FriendKeys";
import { AddFriendRequest } from "@/@types/Requests/AddRequests/addFriendRequest";
import { UpdateMuteToggleRequest } from "@/@types/Requests/UpdateRequests/updateMuteToggleRequest";

export const FriendQueries = {
  AcceptFriend: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (request: AcceptFriendRequest) =>
        FriendService.AcceptFriend(request),
      onSuccess: () => {
        toast.success("Accepted");
        queryClient.invalidateQueries({
          queryKey: keys.acceptFriend,
          refetchType: "all",
        });
      },
      onError: (error) => {
        console.error("Error accepting friend: ", error);
      },
    });
  },
  AddFriend: (user_guid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (request: AddFriendRequest) =>
        FriendService.AddFriend(request),
      onSuccess: () => {
        toast.success("Request Sent");
        queryClient.invalidateQueries({
          queryKey: keys.getFriendByBaseIdFunc(user_guid),
        });
      },
      onError: (error) => {
        console.error("Error sending friend request ", error);
      },
    });
  },
  GetAllFriendsByBaseIdQuery: (guid: string) => {
    return useQuery({
      queryKey: keys.getFriendByBaseIdFunc(guid),
      queryFn: () => FriendService.GetAllFriendsByBaseId(guid),
    });
  },
  GetAllFriendsByNotiQuery: (guid: string) => {
    return useQuery({
      queryKey: keys.getFriendNotisFunc(guid),
      queryFn: () => FriendService.GetAllFriendsNoti(guid),
    });
  },
  GetFriendById: (friendId: number) => {
    return useQuery({
      queryKey: keys.getFriendById,
      queryFn: () => FriendService.GetFriendById(friendId),
    });
  },
  GetPendingFriendRequestsQuery: (baseId: number) => {
    return useQuery({
      queryKey: keys.getPendingFriendRequestsFunc(baseId),
      queryFn: () => FriendService.GetBasePendingRequests(baseId),
    });
  },
  ToggleFriendNotis: (userGuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ request }: { request: UpdateMuteToggleRequest }) =>
        FriendService.ToggleFriendNotis(request),
      onSuccess: (_, { request }) => {
        queryClient.invalidateQueries({
          queryKey: keys.getFriendNotisFunc(userGuid),
        });
        queryClient.invalidateQueries({
          queryKey: keys.getPendingFriendRequestsFunc(request.userId),
        });
      },
      onError: (error) => {
        console.error("Error sending friend request ", error);
      },
    });
  },
  RemoveFriend: (userGuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        userId,
        friendId,
      }: {
        userId: number;
        friendId: number;
      }) => FriendService.RemoveFriend(userId, friendId),
      onSuccess: (_, { userId }) => {
        toast.success("Friend Removed");
        queryClient.invalidateQueries({
          queryKey: keys.getFriendByBaseIdFunc(userGuid), // Ensure the correct query key is invalidated
        });
        queryClient.invalidateQueries({
          queryKey: keys.getPendingFriendRequestsFunc(userId),
        });
      },
      onError: (error) => {
        console.error("Error sending friend request ", error);
      },
    });
  },
};
