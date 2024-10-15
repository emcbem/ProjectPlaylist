export interface Achievement {
    id: number;
    platformGameId: number;
    imageUrl: string;
    name: string;
    description: string;
    platformGame: PlatformGame;
}
