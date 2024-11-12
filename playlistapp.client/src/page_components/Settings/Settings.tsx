import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import React, { useRef } from "react";
import PlatformGamerTags from "../Account/PlatformGamerTags";
import EditUserGenresList from "./EditUserGenresList";
import EditBio from "./EditBio";
import { Link } from "react-router-dom";


const Settings = () => {
    const { usr, isLoading } = React.useContext(
        UserAccountContext
    ) as UserAccountContextInterface;

    const profileInfoRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const platformsRef = useRef<HTMLDivElement>(null);
    const themeRef = useRef<HTMLDivElement>(null);
    const genresRef = useRef<HTMLDivElement>(null);
    const gamesRef = useRef<HTMLDivElement>(null);
    const deleteAccountRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black dark:text-white ">
                <div className="m-8 w-99 flex justify-center">
                    <h1 className="text-2xl">Loading ...</h1>
                </div>
            </div>
        )
    }

    return (

        <div className="min-h-screen bg-white dark:bg-black dark:text-white ">
            <div className="m-8 w-99 flex justify-center">
                <div className="flex flex-wrap align-top">
                    <div className="">
                        <img className="rounded-full w-24 h-24 shadow-inner flex-shrink bg-gray-50" src={usr?.profileURL ?? ""} alt="User Profile Image" />
                        <Link to={"/settings/setprofileimage"}><span className="text-teal-500 underline underline-offset-1">edit image</span></Link>
                    </div>
                    {usr &&
                        <div className="flex flex-col px-8" style={{ maxWidth: "900px" }}>
                            <h1 className="mb-7">Account &gt; Settings</h1>
                            <section className="mb-5" id="profile-info" ref={profileInfoRef}>
                                <h2 className="text-2xl">Profile Info</h2>
                                <p className="font-sans">{usr.username}</p>
                                <p className="text-teal-500 underline underline-offset-1">edit username</p>
                            </section>
                            <section className="mb-5" id="bio" ref={bioRef}>
                                <h2 className="text-2xl">Bio</h2>
                                <EditBio />
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5" id="platforms" ref={platformsRef}>
                                <h2 className="text-2xl">Platforms</h2>
                                <PlatformGamerTags />
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5" id="preferred-theme" ref={themeRef}>
                                <h2 className="text-2xl">Preferred Theme</h2>
                                <p>Light Mode</p>
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5" id="favorite-genres" ref={genresRef}>
                                <h2 className="text-2xl">Favorite Genres</h2>
                                <EditUserGenresList userGuid={usr.guid} />
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5" id="favorite-games" ref={gamesRef}>
                                <h2 className="text-2xl">Favorite Games</h2>
                                <p>Light Mode</p>
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5">
                                <h2 className="text-2xl">Notifications</h2>
                                <p>No notification functionality yet ...</p>
                            </section>
                            <hr className="mb-8" />
                            <section className="mb-5" id="delete-account" ref={deleteAccountRef}>
                                <h2 className="text-2xl">Delete Account</h2>
                                <p>Danger Danger! ...</p>
                            </section>
                        </div>
                    }
                    <div className="text-right hidden">
                        <p onClick={() => scrollToSection(profileInfoRef)}>Profile Info</p>
                        <p onClick={() => scrollToSection(bioRef)}>Bio</p>
                        <p onClick={() => scrollToSection(platformsRef)}>Platforms</p>
                        <p onClick={() => scrollToSection(themeRef)}>Preferred Theme</p>
                        <p onClick={() => scrollToSection(genresRef)}>Favorite Genres</p>
                        <p onClick={() => scrollToSection(gamesRef)}>Favorite Games</p>
                        <p onClick={() => scrollToSection(deleteAccountRef)}>Delete Account</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Settings