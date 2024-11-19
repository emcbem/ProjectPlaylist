export interface Friend {
    id: number,
    isAccepted: boolean,
    dateAccepted: string,
    baseUser: User,
    receivingUser: User
}