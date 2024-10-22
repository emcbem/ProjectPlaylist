import { AddListRequest } from '@/@types/Requests/addListRequest';
import { UserAccountContextInterface } from '@/@types/userAccount';
import { PlusIcon } from '@/assets/plusIcon';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { ListQueries } from '@/hooks/ListQueries';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PlaylistLists = () => {
    const [dropDownIsVisible, setDropDownIsVisible] = useState(false)
    const { mutateAsync } = ListQueries.useAddListQuery();
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const { usr } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;
    const { data: lists } = ListQueries.useGetListsByUserId(usr?.guid ?? "");


    const handleAddNewList = async () => {
        const newList: AddListRequest = {
            userId: String(usr?.guid),
            name: "New List",
            isPublic: true,
            creationDate: new Date()
        }

        var id = await mutateAsync(newList);

        navigate(`/list/${id}`)
    }

    console.log(lists)

    return (
        <>
            {/* onClick={(event) => {
                    event.stopPropagation();
                    setDropDownIsVisible(!dropDownIsVisible);
                }}  */}
            <div className="flex flex-wrap bg-gray-300 p-1 rounded-full d-none w-fit ">
                <div id="dropdownDefaultButton" role="button" className="p-3 hover:scale-110" onClick={(event) => {
                    event.stopPropagation();
                    setDropDownIsVisible(!dropDownIsVisible);
                }}>
                    <PlusIcon width={"20"} height={"20"} />
                </div>
                <div id="dropdown" className={`${dropDownIsVisible ? `absolute mt-8` : `hidden`} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li><span role="button" onClick={handleAddNewList} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create New List</span></li>
                    </ul>
                </div>
            </div>

            {/* <button onClick={() => setShowModal(!showModal)} data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button> */}

            <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${showModal ? "" : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                New List
                            </h3>
                            <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                            </p>
                            <input type="text" />
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add List</button>
                            <button onClick={() => setShowModal(false)} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '300px' }}></div>

            <div className="flex flex-row mt-8">
                {lists && lists?.map((list, key) => (
                    <div className="w-1/3" key={key}>
                        <div className="relative mx-5">
                            {/* Eventually loop through the first few games in the list */}
                            {(
                                <div className="grid grid-cols-2 gap-4">
                                    {list.games && list.games.map((ug, key) => (
                                        <div key={key} className="relative">
                                            <p>{ug[0]}</p>
                                            {/* <img
                                                src={ug.gam}
                                                className="w-full h-full object-cover"
                                                style={{ aspectRatio: '1 / 1' }} // Ensures the image is square
                                            /> */}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Link to={`/list/${list.id}`}>
                                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end opacity-100 dark:opacity-100 customGradient p-2">
                                    <div>
                                        <p className="text-white text-2xl me-2">{list.name}<br />
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                            </svg>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
        </>

    )
}

export default PlaylistLists
