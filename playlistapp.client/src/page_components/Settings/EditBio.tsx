import { UpdateUserRequest } from '@/@types/Requests/UpdateRequests/updateUserRequest';
import { UserAccountContextInterface } from '@/@types/userAccount'
import { UserImage } from '@/@types/userImage';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { ImageQueries } from '@/hooks/ImageQueries';
import { UserAccountQueries } from '@/hooks/UserAccountQueries';
import React from 'react';
import { useState } from 'react'

const EditBio = () => {
    const { usr, isLoading } = React.useContext(UserAccountContext) as UserAccountContextInterface;
    const [value, setValue] = useState<string | undefined>(usr?.bio);
    const [showTextBox, setShowTextBox] = useState<boolean>();
    const { data: allUserImages } = ImageQueries.useGetImages();
    const { mutateAsync: editUser, isPending } = UserAccountQueries.useUpdateUser();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    const handleSavePress = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)
        if (userImage && usr) {
            const newUpdateUserRequest: UpdateUserRequest = {
                guid: usr.guid,
                username: usr.username,
                bio: value ?? "",
                strikes: usr.strikes ?? 0,
                xp: usr.xp ?? 0,
                userImageID: userImage[0].id
            }
            await editUser(newUpdateUserRequest)
            setShowTextBox(false);
        }
    }

    if (isLoading || isPending) { return (<p>Updating your bio... </p>) }

    return (
        <>
            <div className=''>
                <textarea
                    aria-label='Edit List Name'
                    value={value}
                    className={`${showTextBox ? "" : "hidden"} bg-inherit rounded w-full`}
                    onChange={handleChange}
                />
                <button
                    onClick={handleSavePress}
                    className={`${showTextBox ? "" : "hidden"} bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded mt-2 inline-block`}
                >
                    Update Bio
                </button>
            </div>
            <p className={`${!showTextBox ? "" : "hidden"} font-sans`}>{usr?.bio && usr?.bio.length >= 0 ? usr?.bio : <span className="text-clay-900">No bio yet...</span>}</p>
            <p className={`${!showTextBox ? "" : "hidden"} text-teal-500 underline underline-offset-1`} onClick={() => setShowTextBox(!showTextBox)}>edit bio</p>
        </>
    )
}

export default EditBio