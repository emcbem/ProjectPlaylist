const UserPlatformKeys = {
    GetByUserKey: ["userplatforms"] as const,
    GetUser: (userGuid: string) => ["userplatforms", "getbyuser", userGuid] as const,
}

export default UserPlatformKeys;