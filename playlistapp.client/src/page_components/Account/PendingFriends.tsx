import { Friend } from '@/@types/friend';
import { UserAccount } from '@/@types/userAccount';
import { FC } from 'react'
import { FilterMyPendingFriends } from './logic/FilterMyPendingFriends';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { FriendQueries } from '@/hooks/FriendQueries';
import { AcceptFriendRequest } from '@/@types/Requests/AddRequests/acceptFriendRequest';

interface PendingFriendsProps {
    pendingFriends: Friend[],
    usr: UserAccount
}

const PendingFriends: FC<PendingFriendsProps> = ({ pendingFriends, usr }) => {
    const { mutateAsync: AcceptFriendAsync } = FriendQueries.AcceptFriend();

    const handleAcceptFriend = async(friendId: number) => {
        const request: AcceptFriendRequest = {
            friendId: friendId,
            isAccepted: true
        }
        await AcceptFriendAsync(request)
    }

    return (
        <div>
            {FilterMyPendingFriends(pendingFriends, usr.id)?.length ? (
                FilterMyPendingFriends(pendingFriends, usr.id).map((x, key) => (
                    <>
                        <h2 className="mt-3 text-xl text-gray-500">Pending Requests</h2>
                        <div key={key} className='m-3 bg-clay-200 rounded-lg px-3 py-2'>
                            <div className='flex flex-row justify-between align-middle items-center'>
                                <p className='mx-3'>{x.baseUser.username}</p>
                                <div
                                    className="cursor-pointer relative flex flex-row items-center border border-white dark:text-white text-white hover:bg-white hover:text-clay-100 rounded-lg text-start py-1 px-2  justify-center space-x-1"
                                    role="button" onClick={() => handleAcceptFriend(x.id)}>
                                    <UserPlusIcon /> Accept
                                </div>
                            </div>
                        </div>
                    </>
                ))
            ) : (
                <p></p>
            )}
        </div>
    )
}

export default PendingFriends