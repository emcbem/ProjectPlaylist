const UserGameKeys = {
    UserGameByGame: ["UserGame", "ByGame"] as const, 
    DeleteUserGame: ["UserGame", "Delete"] as const, 
    UpdateUserGame: ["UserGame", "Update"] as const,
    GetAllUserGamesByUser: ["UserGame", "GetAllUserGamesByUser"] as const,
    AddUserGame: ["UserGame, AddUserGame"]
  };
  
  export default UserGameKeys;
  