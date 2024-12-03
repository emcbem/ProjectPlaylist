import { useState } from "react";
import UserLibraryGridView from "./UserLibraryGridView";
import UserLibraryListView from "./UserLibraryListView";
import { UserGameQueries } from "@/queries/UserGameQueries";
import { Link, useParams } from "react-router-dom";
import GridAndListIcons from "@/individual_components/GridAndListIcons";
import { UserAccountQueries } from "@/queries/UserAccountQueries";

const UserLibrary = () => {
  const { id } = useParams<{ id: string }>();
  const [isListView, setIsListView] = useState<boolean>(true);

  const { data: usr } = UserAccountQueries.useGetUserById(id!);

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(id ?? "");

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    isSuccess &&
    usr && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <div className="grid justify-items-center ">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
            <div className="text-lg mt-6">
              <Link to={"/account"}>
                <span className="hover:underline underline-offset-2">
                  Account
                </span>
              </Link>{" "}
              <span className="text-clay-950  font-light">/ Library</span>
            </div>
            <div className="flex flex-row items-baseline">
              <h1 className="text-3xl mt-8">{usr.username}'s Library</h1>
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
              <UserLibraryGridView games={userGamesFromUser} />
            ) : (
              <UserLibraryListView games={userGamesFromUser} />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserLibrary;
