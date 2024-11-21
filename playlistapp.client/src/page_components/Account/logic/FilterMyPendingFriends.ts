import { Friend } from "@/@types/friend";

export const FilterMyPendingFriends = (pendingFriends: Friend[], usrId: number ) => {
    return pendingFriends.filter(x => x.receivingUser.id === usrId);
};