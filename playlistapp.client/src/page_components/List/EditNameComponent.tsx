import { List } from '@/@types/list';
import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import React, { useEffect, useRef, useState } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface EditListProps {
    list: List | undefined;
}

const EditListComponent: React.FC<EditListProps> = ({ list }) => {
    const [showEditNameBox, setShowEditNameBox] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>(list?.name);
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync } = ListQueries.useUpdateListQuery();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setIsEmpty(newValue.length === 0);
    };

    const updateList = async () => {
        console.log("Updating list, ", value)
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
            setIsEditing(false);
            setError("")
        } else {
            setError("List name is required")
        }

    };

    useEffect(() => {
        // console.log("Entering useEffect")

        const handleClick = (event: MouseEvent) => {
            // Check if the click is outside the input box
            if (inputRef.current && !inputRef.current.contains(event.target as Node) && isEditing) {
                console.log("click outside of list")
                updateList();
            }
        };
        
        // console.log("adding event listener")
        document.addEventListener("click", handleClick, true);

        return () => {
            // console.log("removing event listener")
            document.removeEventListener("click", handleClick, true);
        };
    }, [value, isEmpty, list, mutateAsync]);

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isEditing) {
            await updateList();
        }
    };

    useEffect(() => {
        console.log("showing edit name box")

        if (showEditNameBox) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [showEditNameBox]);

    const handleEditButtonClick = () => {
        console.log("clicked edit button");
        setIsEditing(!isEditing);
        setShowEditNameBox(!showEditNameBox);
    };

    return (
        <div className="flex flex-row align-bottom relative">
            <div>
                <p className={`${showEditNameBox ? "hidden" : ""} text-5xl`}>{list?.name}</p>
                <input
                    type="text"
                    aria-label='Edit List Name'
                    ref={inputRef}
                    value={value}
                    className={`${showEditNameBox ? "" : "hidden"} bg-inherit text-5xl rounded`}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                <p className='text-red-600'>{error}</p>
            </div>

            <div className='mt-auto mb-3 ms-12'>
                <span onClick={handleEditButtonClick} role="button">
                    <PencilSquareIcon 
                    className="h-8 absolute bottom-0 right-0 text-clay-900"
                        role="button" />
                </span>
            </div>
        </div>
    );
};

export default EditListComponent;
