import { AddListRequest } from '@/@types/Requests/AddRequests/addListRequest';
import { UserAccount } from '@/@types/userAccount';
import { PlusIcon } from '@/assets/plusIcon'
import { ListQueries } from '@/queries/ListQueries';
import { FC, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
    usr: UserAccount | undefined
}

const AddListBtn: FC<Props> = ({ usr }) => {
    const navigate = useNavigate();
    const { mutateAsync } = ListQueries.useAddListQuery();

    const [dropDownIsVisible, setDropDownIsVisible] = useState(false)

    const handleAddNewList = async () => {
        if (usr == undefined) {
            toast.error("Look's like you're not logged in! Try again.");
        }

        const newList: AddListRequest = {
            userId: String(usr?.guid),
            name: "New List",
            isPublic: true,
            creationDate: new Date()
        }
        var id = await mutateAsync(newList);

        navigate(`/list/${id}`)
    }

    return (
        <div className="flex flex-wrap bg-gray-300 rounded-xl w-fit h-fit">
            <div id="dropdownDefaultButton" role="button" className="p-3 hover:scale-110" onClick={(event) => {
                event.stopPropagation();
                setDropDownIsVisible(!dropDownIsVisible);
            }}>
                <PlusIcon width={"15"} height={"15"} />
            </div>
            <div id="dropdown" className={`${dropDownIsVisible ? `absolute mt-8` : `hidden`} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li><span role="button" onClick={handleAddNewList} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create New List</span></li>
                </ul>
            </div>
        </div>
    )
}

export default AddListBtn