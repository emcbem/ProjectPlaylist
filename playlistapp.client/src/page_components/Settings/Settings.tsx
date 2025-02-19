import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import React, { useRef } from "react";
import EditUserGenresList from "./EditUserGenresList";
import EditBio from "./EditBio";
import { Link } from "react-router-dom";
import EditGamerTags from "./Components/GamerTags/EditGamerTags";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import EditNotifications from "./EditNotifications";
import LoadingPage from "@/individual_components/LoadingPage";

const Settings = () => {
  const { usr, isLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { mutateAsync: deleteAccount } = UserAccountQueries.useDeleteUser(
    usr?.guid ?? ""
  );

  const profileInfoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);
  const deleteAccountRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <LoadingPage />
      </div>
    );
  }

  const handleUserDelete = async () => {
    await deleteAccount();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white ">
      <div className="m-8 w-99 flex justify-center">
        <div className="flex flex-wrap align-top">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-24 h-24 shadow-inner flex-shrin border-2  dark:bg-black bg-white dark:border-clay-950 border-black"
              src={usr?.profileURL ?? ""}
              alt="User Profile Image"
            />
            <Link to={"/settings/setprofileimage"}>
              <span className="text-teal-500 underline underline-offset-1">
                edit image
              </span>
            </Link>
          </div>
          {usr && (
            <div className="flex flex-col px-8" style={{ maxWidth: "900px" }}>
              <h1 className="mb-7">Account &gt; Settings</h1>
              <div className="flex flex-row">
                <section
                  className="mb-16 mr-8"
                  id="profile-info"
                  ref={profileInfoRef}
                >
                  <h2 className="text-2xl">Profile Info</h2>
                  <p className="font-sans">{usr.username}</p>
                  <p className="text-teal-500 underline underline-offset-1 mt-3">
                    edit username
                  </p>
                </section>
                <section className="mb-16 ml-8" id="bio" ref={bioRef}>
                  <h2 className="text-2xl">Bio</h2>
                  <EditBio />
                </section>
              </div>
              <hr className="mb-16" />
              <section className="mb-16" id="platforms" ref={platformsRef}>
                <h2 className="text-2xl">Platforms</h2>
                <EditGamerTags />
              </section>
              <hr className="mb-16" />
              <section className="mb-16" id="favorite-genres" ref={genresRef}>
                <h2 className="text-2xl">Favorite Genres</h2>
                <EditUserGenresList userGuid={usr.guid} />
              </section>
              <hr className="mb-16" />
              <section className="mb-16" id="favorite-games" ref={gamesRef}>
                <h2 className="text-2xl">Favorite Games</h2>
                <p>Not Implemented Yet...</p>
              </section>
              <hr className="mb-16" />
              <section className="mb-16">
                <h2 className="text-2xl">Notifications</h2>
                <EditNotifications />
              </section>
              <hr className="mb-8" />
              <section
                className="mb-16"
                id="delete-account"
                ref={deleteAccountRef}
              >
                <h2 className="text-2xl">Delete Account</h2>
                <p>Not implemented yet ...</p>
                <button
                  className="mr-2 px-4 py-2 bg-inherit border border-solid text-red-600 border-red-600 rounded-md hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="submit"
                  onClick={handleUserDelete}
                >
                  Delete Account
                </button>
              </section>
            </div>
          )}
          <div className="text-right hidden">
            <p onClick={() => scrollToSection(profileInfoRef)}>Profile Info</p>
            <p onClick={() => scrollToSection(bioRef)}>Bio</p>
            <p onClick={() => scrollToSection(platformsRef)}>Platforms</p>
            <p onClick={() => scrollToSection(themeRef)}>Preferred Theme</p>
            <p onClick={() => scrollToSection(genresRef)}>Favorite Genres</p>
            <p onClick={() => scrollToSection(gamesRef)}>Favorite Games</p>
            <p onClick={() => scrollToSection(deleteAccountRef)}>
              Delete Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
