const UserPlatformKeys = {
  GetByUserKey: (userGuid: string) => ["userplatforms", userGuid] as const,
  GetUser: (userGuid: string) =>
    ["userplatforms", "getbyuser", userGuid] as const,
  MutatePlatformKey: ["userplatforms", "userPlatformKey"] as const,
};

export default UserPlatformKeys;
