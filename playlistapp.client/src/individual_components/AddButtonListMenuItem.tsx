import { List } from '@/@types/list';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { GameQueries } from '@/hooks/GameQueries';
import { ListQueries } from '@/hooks/ListQueries';
import { MenuItem } from '@material-tailwind/react';
import React from 'react'

interface props {
    lists: List[] | undefined;
    gameId: string | undefined;
    userGuid: string | undefined;
}

const AddButtonListMenuItem: React.FC<props> = ({ lists, gameId, userGuid }) => {
    const { mutateAsync: updateListMutation } = ListQueries.useUpdateListQuery();
    const { data: game } = GameQueries.useGetGameByIdQuery(Number(gameId));
    
    const handleListMenuItemClick = async (listId: number) => {
        const listToUpdate = lists?.filter(x => x.id === listId) || [];
        const selectedList = listToUpdate[0];
        if (listId && userGuid) {
            const updateListRequest: UpdateListRequest = {
                listId: listId,
                listName: selectedList.name,
                isPublic: selectedList.isPublic,
                gamesToRemove: [],
                newGames: [game],
            };
            await updateListMutation(updateListRequest);
        }
    };

    return (
        <>
            {lists?.map((list, key) => (
                <MenuItem
                    key={key}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className={`font-bold text-gray-900`}
                    onClick={() => { handleListMenuItemClick(list.id) }}
                >
                    {list.name}
                </MenuItem>
            ))}
        </>
    )
}

export default AddButtonListMenuItem