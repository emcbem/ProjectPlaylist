const UserGenreKeys = {
    UserGenreByUser: ["UserGenre", "ByUser"] as const, 
    DeleteUserGenre: ["UserGenre", "Delete"] as const, 
    AddUserGenre: ["UserGenre", "Update"] as const,
    GetAllUserGenresByUser: (userGuid: string) => ["UserGenre", "GetAllUserGenresByUser", userGuid] as const
  };
  
  export default UserGenreKeys;
  