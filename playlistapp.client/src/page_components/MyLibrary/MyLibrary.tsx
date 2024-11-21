import React, { useState } from "react";
import MyLibraryListView from "./Components/MyLibraryListView";
import GridAndListIcons from "../../individual_components/GridAndListIcons";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { Link } from "react-router-dom";
import MyLibraryGridView from "./Components/MyLibraryGridView";

const MyLibrary = () => {
  const [isListView, setIsListView] = useState<boolean>(true);

  const { userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(userGuid ?? "");

  if (isLoading) {
    return <>Loading ...</>
  }

  return (
    isSuccess && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <div className="grid justify-items-center ">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
          <div className="text-lg mt-6"><Link to={'/account'}><span className='hover:underline underline-offset-2'>Account</span></Link> <span className='text-clay-950  font-light'>/ Library</span></div>
            <div className="flex flex-row items-baseline">
              <h1 className="text-3xl mt-8">Your Library</h1>
              <p className="ms-5 text-clay-950 text-lg">{userGamesFromUser.length} game{userGamesFromUser.length !== 1 && 's'}</p>
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

export default MyLibrary;