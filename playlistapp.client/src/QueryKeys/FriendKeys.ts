const FriendKeys = {
    acceptFriend: ["Friend", "AcceptFriend"] as const,
    addFriend: ["Friend", "AddFriend"] as const,
    getFriendByBaseId: ["Friend", "GetFriendByBaseId"] as const,
    getFriendById: ["Friend", "GetFriendById"] as const,
    removeFriend: ["Friend", "RemoveFriend"] as const,
    getPendingFriendRequests: ["Friend", "GetPendingFriendReqeusts"] as const, 
    getFriendByBaseIdFunc: (guid: string) => ['GetFriendByBaseId', guid] as const,
    getFriendByIdFunc: (friendId: number) => ['GetFriendById', friendId] as const,
    getPendingFriendRequestsFunc: (friendId: number) => ['GetPendingFriendReqeusts', friendId] as const,
}

export default FriendKeys;