import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import { UserAccount, UserAccountContextInterface } from "@/@types/userAccount";
import { UserImage } from "@/@types/userImage";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { ImageQueries } from "@/hooks/ImageQueries";
import { UserAccountQueries } from "@/hooks/UserAccountQueries";
import CheckBox from "@/individual_components/Checkbox";
import React, { useState } from "react";

const EditNotifications = () => {
    const { usr, isLoading } = React.useContext(UserAccountContext) as UserAccountContextInterface;
    const { mutateAsync: editUser, isPending } = UserAccountQueries.useUpdateUser();
    const [userUnderChange, setUserUnderChange] = useState<UserAccount | undefined>(usr);
    const { data: allUserImages } = ImageQueries.useGetImages();
    const [hasChanged, sethasChanged] = useState<boolean>(false)
    console.log(hasChanged)

    const handleUnsubscribe = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)

        if (usr && userImage) {
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
            await editUser(updateRequest)
            sethasChanged(false)
        } else {
            console.error("No user or no user image to update...")
        }
    }

    const handleSave = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)

        if (usr && userImage) {
            const updateRequest: UpdateUserRequest = {
                guid: usr.guid,
                username: usr.username,
                bio: usr.bio,
                strikes: usr.strikes ?? 0,
                xp: usr.xp ?? 0,
                userImageID: userImage[0].id,
                notifyOnReviewLiked: usr.notifyOnReviewLiked,
                notifyOnReviewDisliked: usr.notifyOnReviewDisliked,
                notifyOnGoalEndingSoon: usr.notifyOnGoalEndingSoon,
                notifyOnGoalLiked: usr.notifyOnGoalLiked,
                notifyOnGoalDisliked: usr.notifyOnGoalDisliked,
                notifyOnAchievementLiked: usr.notifyOnAchievementLiked,
                notifyOnAchievementDisliked: usr.notifyOnAchievementDisliked,
                notifyOnFriendRequestRecieved: usr.notifyOnFriendRequestRecieved,
                notifyOnFriendRequestAccepted: usr.notifyOnFriendRequestAccepted
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

    if (isLoading || isPending) {
        return <p>Loading ...</p>
    }

    if (!userUnderChange || userUnderChange == undefined) {
        return (<p>No user</p>)
    }

    return (

        <ul className='mt-6'>

            <li className='mt-3 mb-1 text-xl font-semibold'>Reviews</li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnReviewLiked || false} onChange={(e) => handleChange(e, 'notifyOnReviewLiked')} />
                Notify me when someone likes my reviews
            </li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnReviewDisliked || false} onChange={(e) => handleChange(e, 'notifyOnReviewDisliked')} />
                Notify me when someone dislikes my reviews
            </li>

            <li className='mt-3 mb-1 text-xl font-semibold'>Goals</li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalEndingSoon || false} onChange={(e) => handleChange(e, 'notifyOnGoalEndingSoon')} />
                Notify me on upcoming goals
            </li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalLiked || false} onChange={(e) => handleChange(e, 'notifyOnGoalLiked')} />
                Notify me when someone likes my goals
            </li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnGoalDisliked || false} onChange={(e) => handleChange(e, 'notifyOnGoalDisliked')} />
                Notify me when someone dislikes my goals
            </li>

            <li className='mt-3 mb-1 text-xl font-semibold'>Achievements</li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnAchievementLiked || false} onChange={(e) => handleChange(e, 'notifyOnAchievementLiked')} />
                Notify me when someone likes my achievements
            </li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnAchievementDisliked || false} onChange={(e) => handleChange(e, 'notifyOnAchievementDisliked')} />
                Notify me when someone dislikes my achievements
            </li>


            <li className='mt-3 mb-1 text-xl font-semibold'>Friends</li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnFriendRequestRecieved || false} onChange={(e) => handleChange(e, 'notifyOnFriendRequestRecieved')} />
                Friend Requests
            </li>
            <li className="text-lg mb-2">
                <CheckBox value={userUnderChange?.notifyOnFriendRequestAccepted || false} onChange={(e) => handleChange(e, 'notifyOnFriendRequestAccepted')} />
                Friend Requests Accepted
            </li>
            <p className='px-4 py-2 border-white rounded-lg border w-fit' role="button" onClick={handleSave}>Save</p>
            <p className='px-4 py-2 border-white rounded-lg border w-fit' role="button" onClick={handleUnsubscribe}>Unsubscribe from all</p>
        </ul>

    )
}

export default EditNotifications