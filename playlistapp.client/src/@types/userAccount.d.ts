import { ListGame } from "./listgame";
import { Platform } from "./platform";
import { UserGame } from "./usergame";
import { UserNotification } from "./userNotification";

export interface UserAccount {
    id: number;
    username: string;
    bio: string;
    strikes: number | null;
    xp: number | null;
    creationDate: Date;
    authID: string;
    profileURL: string | null;
    profileImageId: nummber;
    usernamePrivate: bool | null;
    libraryPrivate: bool | null;
    gamertagsPrivate: bool | null;
    bioPrivate: bool | null;
    xpPrivate: bool | null;
    favoriteGenresPrivate: bool | null;
    favoriteGamesPrivate: bool | null;
    playtimePrivate: bool | null;
    reviewsPrivate: bool | null;
    goalPrivate: bool | null;
    achievementsPrivate: bool | null;
    notifyOnReviewLiked: bool | null;
    notifyOnReviewDisliked: bool | null;
    notifyOnGoalEndingSoon: bool | null;
    notifyOnGoalLiked: bool | null;
    notifyOnAchievementLiked: bool | null;
    notifyOnAchievementDisliked: bool | null;
    notifyOnFriendRequestRecieved: bool | null;
    notifyOnFriendRequestAccepted: bool | null;
    guid: string;
    userGames: UserGame[];
    gameLists: ListGame[];
    platforms: Platform[];
    notifications: UserNotification[]
}

export interface UserAccountContextInterface {
    usr: UserAccount | undefined;
    userGuid: string | undefined;
    error: string | undefined;
    isLoading: boolean;
}