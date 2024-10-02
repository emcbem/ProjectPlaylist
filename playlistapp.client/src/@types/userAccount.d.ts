export interface UserAccount {
    id: number;
    username: string;
    bio: string;
    strikes: number | null;
    xp: number | null;
    creationDate: string; // Consider using Date type if you prefer
    authID: string;
    profileURL: string | null;
}