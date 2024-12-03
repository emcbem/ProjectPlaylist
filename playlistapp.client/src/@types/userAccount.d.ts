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
    usernamePrivate: boolean | null;
    libraryPrivate: boolean | null;
    gamertagsPrivate: boolean | null;
    bioPrivate: boolean | null;
    xpPrivate: boolean | null;
    favoriteGenresPrivate: boolean | null;
    favoriteGamesPrivate: boolean | null;
    playtimePrivate: boolean | null;
    reviewsPrivate: boolean | null;
    goalPrivate: boolean | null;
    achievementsPrivate: boolean | null;
    notifyOnReviewLiked: boolean | null;
    notifyOnReviewDisliked: boolean | null;
    notifyOnGoalEndingSoon: boolean | null;
    notifyOnGoalLiked: boolean | null;
    notifyOnGoalDisliked: boolean | null
    notifyOnAchievementLiked: boolean | null;
    notifyOnAchievementDisliked: boolean | null;
    notifyOnFriendRequestRecieved: boolean | null;
    notifyOnFriendRequestAccepted: boolean | null;
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
    isLoading: booleanean;
}