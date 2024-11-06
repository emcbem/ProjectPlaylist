const UserGameKeys = {
  UserGameByGame: ["UserGame", "UserGameByGame"] as const,
  DeleteUserGame: ["UserGame", "DeleteUserGame"] as const,
  UpdateUserGame: ["UserGame", "UpdatUserGame"] as const,
  GetAllUserGamesByUser: (userGuid: string) =>
    ["UserGame", "GetAllUserGamesByUser", userGuid] as const,
  AddUserGame: ["UserGame, AddUserGame"],
};

export default UserGameKeys;
