import { Platform } from '@/@types/platform'
import { AddUserPlatformRequest } from '@/@types/Requests/AddRequests/addUserPlatformRequest';
import { UpdateUserPlatformRequest } from '@/@types/Requests/UpdateRequests/UpdateUserPlatformRequest';
import { UserPlatform } from '@/@types/userPlatform';
import { UserPlatformQueries } from '@/queries/UserPlatformQueries';
import { FC, ReactNode, useEffect, useState } from 'react'

interface EditGamerTagFieldProps {
    children: ReactNode,
    platform: Platform,
    userPlatforms: UserPlatform[] | undefined,
    userGuid: string
}

const EditGamerTagField: FC<EditGamerTagFieldProps> = ({ children, platform, userPlatforms, userGuid }) => {
    const { mutateAsync: updateUserPlatforms } = UserPlatformQueries.UpdateUserPlatform();
    const { mutateAsync: addUserPlatform } = UserPlatformQueries.AddUserPlatform();
    const { mutateAsync: deleteUserPlatform } = UserPlatformQueries.DeleteUserPlatform();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [userPlatform, setUserPlatform] = useState<UserPlatform | null>(null);
    const [value, setValue] = useState<string>(""); // initialize to an empty string instead of undefined

    useEffect(() => {
        if (userPlatforms != undefined) {
            const matchedPlatform = userPlatforms.find(x => x.platformId === platform.id);
            if (matchedPlatform) {
                setUserPlatform(matchedPlatform);
                setValue(matchedPlatform.gamerTag || "");
            } else {
                setUserPlatform(null);
                setValue("");
            }
        }
    }, [platform.id, userPlatforms]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const handleSaveClick = async () => {
        if (value.length <= 0) {
            handleRemove()
        }
        if (!userPlatform) {
            AddUserPlatform();
        }
        else {
            const updateRequest: UpdateUserPlatformRequest = {
                id: userPlatform?.id ?? 0,
                gamerTag: value ?? "",
                externalPlatformId: String(platform.id),
                isPublic: true
            }
            await updateUserPlatforms(updateRequest);
            setIsVisible(!isVisible);
        }
    }

    const handleRemove = async () => {
        if (userPlatform != undefined) {
            await deleteUserPlatform(userPlatform?.id);
        }
        else {
            console.error("User platform id was undefined");
        }
    }

    const AddUserPlatform = async () => {
        const request: AddUserPlatformRequest = {
            platformId: platform.id,
            userId: userGuid,
            gamerTag: value ?? "",
            externalPlatformId: "One",
            isPublic: true
        }
        await addUserPlatform(request);
        setIsVisible(!isVisible);
    }

    return (
        <>
            <div className='flex flex-row items-baseline justify-between'>
                {/* Shows the Passed in Icon here */}


                {children}

                {/* <h3 className={`${isVisible ? 'hidden' : ""} ml-4 text-xl font-sans`}>
                    {userPlatforms?.filter(x => x.platformId == platform.id)?.map((x, key) =>
                        <p key={key}>{x.gamerTag}</p>
                    )}
                </h3> */}

                {!isVisible && userPlatform && (
                    <h3 className="ml-4 text-xl font-sans">
                        {userPlatform.gamerTag}
                    </h3>
                )}

                <input type='text' onChange={handleChange} value={value} className={`${!isVisible ? 'hidden' : ""} rounded ml-4 text-black`} />

                <p
                    role="button"
                    className={`text-teal-400 underline underline-offset-2 ms-5 ${isVisible ? 'hidden' : ""}  ${!userPlatform ? 'hidden' : ''}`}
                    onClick={() => setIsVisible(!isVisible)}
                >
                    edit
                </p>

                <p
                    role="button"
                    className={`text-teal-400 underline underline-offset-2 ms-5 ${isVisible ? 'hidden' : ""}  ${!userPlatform ? 'hidden' : ''}`}
                    onClick={handleRemove}
                >
                    remove
                </p>

                <button
                    onClick={handleSaveClick}
                    className={`${!isVisible ? 'hidden' : ""} bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded mt-2 inline-block ml-4`}
                >
                    Save
                </button>

                {userPlatforms
                    && userPlatforms.filter(x => x.platformId == platform.id).length <= 0
                    &&
                    <p role="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className={`ml-4 text-teal-400 underline underline-offset-2 ${isVisible ? 'hidden' : ""} ${userPlatform ? 'hidden' : ''}`}>
                        Add a Gamertag for {platform.name}
                    </p>
                }
            </div>
        </>
    )
}

export default EditGamerTagField