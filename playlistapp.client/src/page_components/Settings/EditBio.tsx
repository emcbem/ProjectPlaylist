import { UpdateUserRequest } from '@/@types/Requests/UpdateRequests/updateUserRequest';
import { UserAccountContextInterface } from '@/@types/userAccount'
import { UserImage } from '@/@types/userImage';
import { UserAccountContext } from '@/contexts/UserAccountContext';
import { ImageQueries } from '@/queries/ImageQueries';
import { UserAccountQueries } from '@/queries/UserAccountQueries';
import React from 'react';
import { useState } from 'react'

const EditBio = () => {
    const { usr, isLoading } = React.useContext(UserAccountContext) as UserAccountContextInterface;
    const [value, setValue] = useState<string | undefined>(usr?.bio);
    const [showTextBox, setShowTextBox] = useState<boolean>(false);

    const { data: allUserImages } = ImageQueries.useGetImages();
    const { mutateAsync: editUser, isPending } = UserAccountQueries.useUpdateUser();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleSavePress = async () => {
        const userImage: UserImage[] | undefined = allUserImages?.filter(x => x.url === usr?.profileURL)
        if (userImage && usr) {
            const newUpdateUserRequest: UpdateUserRequest = {
                guid: usr.guid,
                bio: value ?? "",
                userImageID: userImage[0].id
            } as UpdateUserRequest
            await editUser(newUpdateUserRequest)
            setShowTextBox(false);
        }
    }

    if (isLoading || isPending) { return (<p>Updating your bio... </p>) }

    return (
        <>
            {showTextBox ? (
                <>
                    <textarea
                        aria-label='Edit Profile Bio'
                        value={value}
                        className="bg-inherit rounded w-full"
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleSavePress}
                        className="bg-transparent hover:bg-teal-500 dark:text-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded mt-2 inline-block"
                    >
                        Update Bio
                    </button>
                </>
            ) : (
                <>
                    <p className={`font-sans`}>{usr?.bio && usr?.bio.length >= 0 ? usr?.bio : <span className="text-clay-900">No bio yet...</span>}</p>
                    <p className={`text-teal-500 underline underline-offset-1 hover:underline-offset-2 transition-all mt-3`} role="button" onClick={() => setShowTextBox(!showTextBox)}>edit bio</p>
                </>
            )}
        </>
    )
}

export default EditBio