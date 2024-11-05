import { List } from '@/@types/list';
import { ListGame } from '@/@types/listgame';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import React from 'react';
import { FC, useState } from 'react'

interface RemoveButtonProps {
    listGame: ListGame;
    list: List | undefined;
}

const RemoveFromListButton: FC<RemoveButtonProps> = ({ listGame, list }) => {
    const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);
    const { mutateAsync, isPending } = ListQueries.useUpdateListQuery();

    const toggleDropdown = (gameId: number) => {
        setVisibleDropdown(prevId => (prevId === gameId ? null : gameId));
    };

    const handleRemoveFromLib = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        if (list) {
            const updateListRequest: UpdateListRequest = {
                listId: list.id,
                listName: list.name,
                isPublic: list.isPublic,
                gamesToRemove: [listGame],
                newGames: [],
            };
            await mutateAsync(updateListRequest);
        }
    }

    return (
        <div className="flex flex-wrap bg-white rounded-xl w-fit h-fit">
            {isPending ? (
                <p className="bg-white text-red-500">Deleting...</p>
            ) : (
                <>
                    <div id="dropdownDefaultButton" role="button" className="p-2 hover:scale-110"
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            toggleDropdown(listGame.id);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3 text-clay-900" viewBox="0 0 16 16" >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </div>
                    <div id="dropdown" className={`${visibleDropdown === listGame.id ? 'absolute mt-8' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <span
                                    role="button"
                                    onClick={(e) => handleRemoveFromLib(e)}
                                    className="block px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-800"
                                >
                                    Remove From Library
                                </span>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    )
}

export default RemoveFromListButton