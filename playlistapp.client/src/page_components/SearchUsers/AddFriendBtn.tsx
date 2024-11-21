import { AddFriendRequest } from '@/@types/Requests/AddRequests/addFriendRequest';
import { UserAccountContextInterface } from '@/@types/userAccount';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { FriendQueries } from '@/hooks/FriendQueries'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import toast from 'react-hot-toast';

interface AddFriendBtnProps {
    baseUserId: string,
    recievingUserId: string,
}

const AddFriendBtn: React.FC<AddFriendBtnProps> = ({ baseUserId, recievingUserId }) => {
    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;
    
    const { mutateAsync } = FriendQueries.AddFriend(usr?.guid ?? "");

    const handleAddFriend = async () => {
        if (baseUserId == undefined || recievingUserId == undefined) {
            toast.error("Something went wrong adding this friend.");
            console.error("baseUserId or recievingUserId was null");
        }
        else {
            const addFriendRequest: AddFriendRequest = {
                baseUserId: baseUserId ?? '', // guid
                recievingUserId: recievingUserId ?? '' // guid
            }
            await mutateAsync(addFriendRequest)
        }
    }

    return (
        <div
            className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start py-1 px-2  justify-center space-x-1 mt-2"
            role="button" onClick={handleAddFriend}>
            <UserPlusIcon /> Friend
        </div>
    )
}

export default AddFriendBtn