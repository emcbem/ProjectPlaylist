import React, { useState } from "react";
import MyLibraryListView from "./Components/MyLibraryListView";
import GridAndListIcons from "../../individual_components/GridAndListIcons";
import { UserGameQueries } from "@/queries/UserGameQueries";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { Link, useParams } from "react-router-dom";
import MyLibraryGridView from "./Components/MyLibraryGridView";
import LoadingPage from "../../individual_components/LoadingPage";
import { UserAccountQueries } from "@/queries/UserAccountQueries";

const UserLibrary = () => {
  const { id } = useParams<{ id: string }>();

  const { userGuid, isLoading: isAccountLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const userId = id ?? userGuid;

  const { data: usr } = UserAccountQueries.useGetUserById(userId!);

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(userId ?? "");

  const [isListView, setIsListView] = useState<boolean>(true);

  if (isLoading || isAccountLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <LoadingPage />
      </div>
    );
  }

  return (
    isSuccess && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <div className="grid justify-items-center ">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
            <div className="text-lg mt-6">
              <Link to={id ? `/user/${usr?.guid}` : "/account"}>
                <span className="hover:underline underline-offset-2">
                  {usr?.username}
                </span>
              </Link>{" "}
              <span className="text-clay-950  font-light">/ Library</span>
            </div>
            <div className="flex flex-row items-baseline">
              {id ? (
                <h1 className="text-3xl mt-8">{usr?.username}'s Library</h1>
              ) : (
                <h1 className="text-3xl mt-8">Your Library</h1>
              )}
              <p className="ms-5 text-clay-950 text-lg">
                {userGamesFromUser.length} game
                {userGamesFromUser.length !== 1 && "s"}
              </p>
            </div>

            <GridAndListIcons
              isListView={isListView}
              setIsListView={setIsListView}
            />

            {isListView ? (
              <MyLibraryGridView games={userGamesFromUser} />
            ) : (
              <MyLibraryListView games={userGamesFromUser} />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserLibrary;
