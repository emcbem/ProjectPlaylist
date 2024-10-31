const UserGameKeys = {
    UserGameByGame: ["UserGame", "ByGame"] as const, 
    DeleteUserGame: ["UserGame", "Delete"] as const, 
    UpdateUserGame: ["UserGame", "Update"] as const,
    GetAllUserGamesByUser: (userGuid: string) => ["UserGame", "GetAllUserGamesByUser", userGuid] as const,
    AddUserGame: ["UserGame, AddUserGame"]
  };
  
  export default UserGameKeys;
  