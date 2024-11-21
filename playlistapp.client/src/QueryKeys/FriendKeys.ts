const FriendKeys = {
    acceptFriend: ["Friend", "AcceptFriend"] as const,
    addFriend: ["Friend", "AddFriend"] as const,
    getFriendByBaseId: ["Friend", "GetFriendByBaseId"] as const,
    getFriendById: ["Friend", "GetFriendById"] as const,
    removeFriend: ["Friend", "RemoveFriend"] as const,
    getPendingFriendRequests: ["Friend", "GetPendingFriendReqeusts"] as const, 
    getFriendByBaseIdFunc: (guid: string) => ['Friend', 'GetFriendByBaseId', guid] as const,
    getFriendByIdFunc: (friendId: number) => ['Friend', 'GetFriendById', friendId] as const,
    getPendingFriendRequestsFunc: (friendId: number) => ['Friend', 'GetPendingFriendReqeusts', friendId] as const,
}

export default FriendKeys;