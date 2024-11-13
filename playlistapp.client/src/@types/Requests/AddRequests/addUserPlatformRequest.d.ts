export interface AddUserPlatformRequest {
    platformId: number,
    userId: string,
    gamerTag: string,
    externalPlatformId: string,
    isPublic: boolean,
}