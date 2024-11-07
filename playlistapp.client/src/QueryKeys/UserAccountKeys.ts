const UserAccountKeys = {
  GetUserByUsername: ["UserAccount", "GetUserByUsername"] as const,
  GetUserByAuthId: ["UserAccount", "GetUserByAuthId"] as const,
  GetUserByUserId: ["UserAccount", "GetuserById"] as const,
  AddNewUser: ["UserAccount", "AddNewUser"] as const,
  UpdateUser: ["UserAccount", "UpdateUser"] as const,
  DeleteUser: ["UserAccount", "DeleteUser"] as const,
  GetUser: (userGuid: string) => ["UserAccount", "GetUserByAuthId", userGuid] as const,
};

export default UserAccountKeys;
