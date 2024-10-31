export interface UpdateUserRequest {
    guid: string,
    username: string,
    bio: string,
    strikes: number,
    xp: number,
    userImageID: number
}