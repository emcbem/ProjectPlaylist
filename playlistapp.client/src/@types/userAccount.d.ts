import { ListGame } from "./listgame";
import { Platform } from "./platform";
import { UserGame } from "./usergame";

export interface UserAccount {
    id: number;
    username: string;
    bio: string;
    strikes: number | null;
    xp: number | null;
    creationDate: Date;
    authID: string;
    profileURL: string | null;
    guid: string;
    userGames: UserGame[];
    gameLists: ListGame[];
    platforms: Platform[]
}

export interface UserAccountContextInterface {
    usr: UserAccount | undefined;
    error: string | undefined;
    isLoading: boolean;
}