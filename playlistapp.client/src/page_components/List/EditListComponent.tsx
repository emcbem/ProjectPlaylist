import { List } from '@/@types/list';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import React, { useState } from 'react'

interface EditListProps {
    list: List | undefined
}

const EditListComponent: React.FC<EditListProps> = ({ list }) => {
    const [showEditNameBox, setshowEditNameBox] = useState<boolean>(false);
    const [value, setValue] = useState("Default");
    const [isEmpty, setIsEmpty] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setIsEmpty(newValue.length === 0);
    };

    const { mutateAsync } = ListQueries.useUpdateListQuery();


    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (!isEmpty) {
                var updatedList: UpdateListRequest = {
                    listId: list?.id ?? -1,
                    listName: value,
                    newGames: list?.games ?? [],
                    gamesToRemove: [],
                    isPublic: list?.isPublic ?? false,
                }

                await mutateAsync(updatedList);
                setshowEditNameBox(false);
            }
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        console.log(event.detail);
        switch (event.detail) {
            case 2: {
                setshowEditNameBox(true);
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <>
            <p onClick={handleClick} className={`${showEditNameBox ? "hidden" : ""} text-5xl`}>{list?.name}</p>
            <input type="text" value={value} className={`${showEditNameBox ? "" : "hidden"} bg-inherit text-5xl`} onChange={handleChange} onKeyDown={handleKeyPress} />
        </>
    )
}

export default EditListComponent