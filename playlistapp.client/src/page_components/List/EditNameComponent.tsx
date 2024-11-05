import { List } from '@/@types/list';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import React, { useEffect, useRef, useState } from 'react';

interface EditListProps {
    list: List | undefined;
}

const EditListComponent: React.FC<EditListProps> = ({ list }) => {
    const [showEditNameBox, setShowEditNameBox] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>(list?.name);
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync } = ListQueries.useUpdateListQuery();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setIsEmpty(newValue.length === 0);
    };

    const updateList = async () => {
        if (value && !isEmpty) {
            const updatedList: UpdateListRequest = {
                listId: list?.id ?? -1,
                listName: value,
                newGames: [],
                gamesToRemove: [],
                isPublic: list?.isPublic ?? false,
            };
            await mutateAsync(updatedList);
            setShowEditNameBox(false);
        }
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Check if the click is outside the input box
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                updateList();
            }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [value, isEmpty, list, mutateAsync]);

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            await updateList();
        }
    };

    useEffect(() => {
        if (showEditNameBox) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [showEditNameBox]);

    const handleClick = () => {
        setShowEditNameBox(!showEditNameBox);
    };

    return (
        <div className="flex flex-row align-bottom">
            <div>
                <p className={`${showEditNameBox ? "hidden" : ""} text-5xl`}>{list?.name}</p>
                <input
                    type="text"
                    aria-label='Edit List Name'
                    ref={inputRef}
                    value={value}
                    className={`${showEditNameBox ? "" : "hidden"} bg-inherit text-5xl`}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className='mt-auto mb-3 ms-3'>
                <span onClick={handleClick} role="button" className="underline text-clay-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default EditListComponent;
