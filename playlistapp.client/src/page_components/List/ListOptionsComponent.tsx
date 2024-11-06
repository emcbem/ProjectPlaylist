import React from 'react'
import RemoveListModal from './RemoveListModal'
import { List } from '@/@types/list';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import OpenEyeIcon from '@/assets/Icons/OpenEyeIcon';
import CloseEyeIcon from '@/assets/Icons/CloseEyeIcon';

interface ListOptionsComponentProps {
    list: List | undefined;
}

const ListOptionsComponent: React.FC<ListOptionsComponentProps> = ({ list }) => {
    const { mutateAsync } = ListQueries.useUpdateListQuery();

    const handleChangePrivacyClick = async () => {
        if (list) {
            const updateListRequest: UpdateListRequest = {
                listId: list.id,
                listName: list.name,
                isPublic: !list.isPublic,
                gamesToRemove: [],
                newGames: [],
            };
            await mutateAsync(updateListRequest);
        }
    }

    return (
        <div className="flex flex-row items-center">
            <span onClick={handleChangePrivacyClick} role="button" className='me-3'>
                {list?.isPublic ?
                    <OpenEyeIcon /> :
                    <CloseEyeIcon />
                }
            </span>
            <RemoveListModal list={list} />
        </div>
    )
}

export default ListOptionsComponent