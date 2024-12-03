import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import { UserAccount, UserAccountContextInterface } from "@/@types/userAccount";
import { UserImage } from "@/@types/userImage";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { ImageQueries } from "@/queries/ImageQueries";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import CheckBox from "@/individual_components/Checkbox";
import React, { useState } from "react";

const EditNotifications = () => {
    const { usr } = React.useContext(UserAccountContext) as UserAccountContextInterface;
    const { mutateAsync: editUser, isPending } = UserAccountQueries.useUpdateUser();
    const { data: allUserImages } = ImageQueries.useGetImages();
    const [userUnderChange, setUserUnderChange] = useState<UserAccount | undefined>(usr);
    const [hasChanged, sethasChanged] = useState<boolean>(false)

    const handleUnsubscribe = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)

        if (usr && userImage && userUnderChange) {
            const updateRequest: UpdateUserRequest = {
                guid: usr.guid,
                username: usr.username,
                bio: usr.bio,
                strikes: usr.strikes ?? 0,
                xp: usr.xp ?? 0,
                userImageID: userImage[0].id,
                notifyOnReviewLiked: false,
                notifyOnReviewDisliked: false,
                notifyOnGoalEndingSoon: false,
                notifyOnGoalLiked: false,
                notifyOnGoalDisliked: false,
                notifyOnAchievementLiked: false,
                notifyOnAchievementDisliked: false,
                notifyOnFriendRequestRecieved: false,
                notifyOnFriendRequestAccepted: false,
            };
            userUnderChange.notifyOnReviewLiked = false;
            userUnderChange.notifyOnReviewDisliked = false;
            userUnderChange.notifyOnGoalEndingSoon = false;
            userUnderChange.notifyOnGoalLiked = false;
            userUnderChange.notifyOnGoalDisliked = false;
            userUnderChange.notifyOnAchievementLiked = false;
            userUnderChange.notifyOnAchievementDisliked = false;
            userUnderChange.notifyOnFriendRequestRecieved = false;
            userUnderChange.notifyOnFriendRequestAccepted = false;
            await editUser(updateRequest)
            sethasChanged(false)
        } else {
            console.error("No user or no user image to update...")
        }
    }

    const handleSave = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)

        if (usr && userImage && userUnderChange) {
            const updateRequest: UpdateUserRequest = {
                guid: usr.guid,
                username: usr.username,
                bio: usr.bio,
                strikes: usr.strikes ?? 0,
                xp: usr.xp ?? 0,
                userImageID: userImage[0].id,
                notifyOnReviewLiked: userUnderChange.notifyOnReviewLiked,
                notifyOnReviewDisliked: userUnderChange.notifyOnReviewDisliked,
                notifyOnGoalEndingSoon: userUnderChange.notifyOnGoalEndingSoon,
                notifyOnGoalLiked: userUnderChange.notifyOnGoalLiked,
                notifyOnGoalDisliked: userUnderChange.notifyOnGoalDisliked,
                notifyOnAchievementLiked: userUnderChange.notifyOnAchievementLiked,
                notifyOnAchievementDisliked: userUnderChange.notifyOnAchievementDisliked,
                notifyOnFriendRequestRecieved: userUnderChange.notifyOnFriendRequestRecieved,
                notifyOnFriendRequestAccepted: userUnderChange.notifyOnFriendRequestAccepted
            };
            await editUser(updateRequest)
            sethasChanged(false)
        } else {
            console.error("No user or no user image to update...")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, property: keyof UserAccount) => {
        if (userUnderChange) {
            setUserUnderChange({
                ...userUnderChange,
                [property]: e.target.checked,
            });
            sethasChanged(true);
        }
    };

    if (!userUnderChange || userUnderChange == undefined) {
        return (<p>No user</p>)
    }

    return (
        <div className='mt-6'>
            <div className='mt-4 mb-1 text-xl font-semibold'>Reviews</div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnReviewLiked || false} onChange={(e) => handleChange(e, 'notifyOnReviewLiked')} />
                Notify me when someone likes my reviews
            </div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnReviewDisliked || false} onChange={(e) => handleChange(e, 'notifyOnReviewDisliked')} />
                Notify me when someone dislikes my reviews
            </div>

            <div className='mt-4 mb-1 text-xl font-semibold'>Goals</div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalEndingSoon || false} onChange={(e) => handleChange(e, 'notifyOnGoalEndingSoon')} />
                Notify me on upcoming goals
            </div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalLiked || false} onChange={(e) => handleChange(e, 'notifyOnGoalLiked')} />
                Notify me when someone likes my goals
            </div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalDisliked || false} onChange={(e) => handleChange(e, 'notifyOnGoalDisliked')} />
                Notify me when someone dislikes my goals
            </div>

            <div className='mt-4 mb-1 text-xl font-semibold'>Achievements</div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnAchievementLiked || false} onChange={(e) => handleChange(e, 'notifyOnAchievementLiked')} />
                Notify me when someone likes my achievements
            </div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnAchievementDisliked || false} onChange={(e) => handleChange(e, 'notifyOnAchievementDisliked')} />
                Notify me when someone dislikes my achievements
            </div>

            <div className='mt-4 mb-1 text-xl font-semibold'>Friends</div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnFriendRequestRecieved || false} onChange={(e) => handleChange(e, 'notifyOnFriendRequestRecieved')} />
                Friend Requests
            </div>
            <div className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnFriendRequestAccepted || false} onChange={(e) => handleChange(e, 'notifyOnFriendRequestAccepted')} />
                Friend Requests Accepted
            </div>{isPending ? (<p className="mt-6 text-lg">Saving Changes ...</p>) : (
                <div className="flex flex-row mt-6">
                    <div className={`px-4 py-2 border-white rounded-lg border w-fit me-3 ${hasChanged && "bg-teal-400 text-black font-bold"} transition-all`} role="button" onClick={handleSave}>Save</div>
                    <div className='px-4 py-2 border-transparent hover:border-white rounded-lg border w-fit me-3 transition-all' role="button" onClick={handleUnsubscribe}>Unsubscribe from all</div>
                </div>
            )}
        </div>

    )
}

export default EditNotifications