import React from "react";
import "./Account.modules.scss";
import { useAuth0 } from "@auth0/auth0-react";
import PlatformGamerTags from "./PlatformGamerTags";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import PlaylistLists from "./PlaylistLists";
import LibraryLoading from "./LibraryViewsComponents/LibraryLoading";
import LibraryList from "./LibraryViewsComponents/LibraryList";
import LibraryListNoGames from "./LibraryViewsComponents/LibraryListNoGames";
import { UserGameQueries } from "@/hooks/UserGameQueries";

const Account = () => {
  const { isAuthenticated } = useAuth0();

  const { usr, userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(userGuid ?? "");

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("usr.profileURL: ", usr?.profileURL);
  console.log("isSuccess: ", isSuccess);

  return (
    isAuthenticated &&
    usr?.profileURL &&
    isSuccess && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="m-8 w-full" style={{ maxWidth: "1200px" }}>
          <div className="flex flex-wrap">
            <img className="rounded-full w-10" src={usr?.profileURL} />
            <div>
              <p className="text-4xl ms-8">{usr.username}</p>
              <p className="text-2xl ms-8">{usr?.xp == 0 ? 0 : usr?.xp} Xp</p>
            </div>
          </div>

          <PlatformGamerTags />

          <p className="mt-8 text-6xl">Your Library</p>
          {isLoading && <LibraryLoading />}
          {!isLoading && userGamesFromUser && userGamesFromUser.length > 0 && (
            <LibraryList userGamesFromUser={userGamesFromUser} />
          )}
          {!isLoading && userGamesFromUser.length <= 0 && (
            <LibraryListNoGames />
          )}

          <PlaylistLists />
        </div>
      </div>
    )
  );
};

export default Account;
