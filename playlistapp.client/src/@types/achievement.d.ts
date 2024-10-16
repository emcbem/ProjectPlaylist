export interface Achievement {
  id: number;
  platformGameId: number;
  imageURL: string;
  name: string;
  description: string;
  platformGame: PlatformGame;
}
