export interface Platform {
    id: number;
    name: string;
    logoURL: string;
}

export interface PlatformContextInterface {
    platforms: Platform[];
    error: string | undefined;
    isLoading: boolean;
}