import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserImage } from "@/@types/userImage";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountQueries } from "@/hooks/UserAccountQueries";
import { UserImageQueries } from "@/hooks/UserImageQueries";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChooseProfileImg = () => {
    const { usr } = React.useContext(UserAccountContext) as UserAccountContextInterface;
    const { mutateAsync: editUser } = UserAccountQueries.useUpdateUser();
    const { data: images } = UserImageQueries.useGetAllImages();
    const [oldProfileImage] = useState(images?.filter(x => x.url === usr?.profileURL)[0])
    const [selectedUserImage, setSelectedUserImage] = useState<UserImage | undefined>(oldProfileImage);
    const navigate = useNavigate();

    const handleImageSelect = (imageUrl: UserImage) => {
        setSelectedUserImage(imageUrl);
    };

    const handleUserUpdate = async () => {
        if (selectedUserImage && usr) {
            const newUpdateUserRequest: UpdateUserRequest = {
                guid: usr.guid,
                username: usr.username,
                bio: usr.bio,
                strikes: usr.strikes ?? 0,
                xp: usr.xp ?? 0,
                userImageID: selectedUserImage?.id
            }
            await editUser(newUpdateUserRequest);
            navigate("/settings")
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
            <div className="md:block hidden w-1/4">
                <div className="sticky flex flex-col p-4 top-8 mt-16 " style={{ maxWidth: "900px" }}>
                    <div>
                        <p className="text-xl text-nowrap">Selected image</p>
                        {usr && usr.profileURL && (
                            <img src={selectedUserImage?.url} className="bg-gray-300 dark:bg-clay-400 rounded-full p-2" style={{ maxWidth: "120px" }} />
                        )}
                    </div>
                    <div className="flex flex-row items-center mt-4">
                        <Link to={"/settings"}><p className="underline text-lg me-3 underline-offset-2">Cancel</p></Link>
                        <button
                            className="bg-black text-white dark:bg-white dark:border-white dark:text-black py-2 px-3 text-lg rounded-lg flex justify-center items-center shadow-md"
                            onClick={handleUserUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4 mb-48" style={{ maxWidth: "1200px" }}>
                {images?.map((image, key) => (
                    <div
                        key={key}
                        className={`relative p-3 m-2 transition-all rounded-full ${image.url === selectedUserImage?.url ? "p-0 bg-orange-100 dark:bg-orange-400 dark:bg-opacity-100" : ""}`}
                    >
                        <img
                            src={image.url}
                            alt={`image-${key}`}
                            className="w-full h-full object-cover aspect-square cursor-pointer"
                            onClick={() => handleImageSelect(image)}
                        />
                    </div>
                ))}
            </div>

            <div className="w-full fixed px-2 mx-4 z-50 shadow-md bottom-0 md:hidden">
                <div className="flex justify-center bg-transparent">
                    {usr && usr.profileURL && (
                        <img src={selectedUserImage?.url} className="-mb-[40px] bg-gray-300 dark:bg-clay-400 rounded-full" style={{ maxWidth: "100px" }} />
                    )}
                </div>
                <div className="w-full flex justify-center bg-gray-300 dark:bg-clay-300 py-3">
                    <div className="flex flex-row justify-between p-4 w-full mx-auto" style={{ maxWidth: "900px" }}>
                        <div className="flex flex-row items-center">
                            <p className="text-xl text-nowrap me-4">Selected image</p>
                        </div>
                        <div className="flex flex-row items-center mt-4">
                            <Link to={"/settings"}>
                                <p className="underline text-lg me-5 underline-offset-2">Cancel</p>
                            </Link>
                            <button
                                className="bg-black text-white dark:bg-white dark:border-white dark:text-black py-2 px-4 text-lg rounded-lg flex justify-center items-center shadow-md"
                                onClick={handleUserUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseProfileImg;
