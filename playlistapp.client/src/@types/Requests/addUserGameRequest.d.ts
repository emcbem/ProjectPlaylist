export interface AddUserGameRequest {
    UserId: string;
    PlatformGameId: number;
}

export interface PlatformContextInterface {
    platforms: Platform[];
    error: string;
    isLoading: boolean;
    fetchAllPlatforms: (platforms: Platform[]) => void;
}