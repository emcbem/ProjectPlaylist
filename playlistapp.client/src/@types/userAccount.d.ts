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
}

export interface UserAccountContextInterface {
    usr: UserAccount | undefined;
    error: string | undefined;
    isLoading: boolean;
}