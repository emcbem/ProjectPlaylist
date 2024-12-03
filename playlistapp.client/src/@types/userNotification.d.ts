export interface UserNotification {
    id: number,
    title: string | null ,
    body: string | null,
    dateNotified: Date | null,
    userNotified: boolean | null,
    url: string | null
}