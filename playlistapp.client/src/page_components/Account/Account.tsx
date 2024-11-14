import React, { useEffect, useState } from "react";
import "./Account.modules.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import PlaylistLists from "./PlaylistLists";
import LibraryLoading from "./LibraryViewsComponents/LibraryLoading";
import LibraryList from "./LibraryViewsComponents/LibraryList";
import LibraryListNoGames from "./LibraryViewsComponents/LibraryListNoGames";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import UserGenresList from "./UserGenresList";
import DisplayCurrentGoal from "../Goals/DisplayCurrentGoal";
import { GoalQueries } from "@/hooks/GoalQueries";
import { Goal } from "@/@types/goal";
import ViewAllGoalsButton from "../Goals/ViewAllGoalsButton";
import GamerTags from "./GamerTags";

const Account = () => {
  const { isAuthenticated } = useAuth0();
  const [currentGoal, setCurrentGoal] = useState<Goal | undefined>(undefined);
  console.log("CurrentGoal: ", currentGoal);

  const { usr, userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(userGuid ?? "");

  const { data: allUserGoals, isSuccess: isGettingGoalsSuccess } =
    GoalQueries.useGetGoalsByUser(userGuid ?? "");

  useEffect(() => {
    const foundCurrentGoal = allUserGoals?.find((x) => x.isCurrent === true);
    setCurrentGoal(foundCurrentGoal);
  }, [allUserGoals]);

  return (
    isAuthenticated &&
    usr?.profileURL &&
    isSuccess &&
    isGettingGoalsSuccess && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="m-8 w-full" style={{ maxWidth: "1200px" }}>


          <div className="flex flex-wrap">
            <img
              className="rounded-full md:w-24 w-14 shadow-inner"
              src={usr?.profileURL}
            />
            <div className="">
              <p className="md:text-4xl text-2xl ms-8">{usr.username}</p>
              <p className="md:text-2xl text-lg ms-8">{usr?.xp == 0 ? 0 : usr?.xp} Xp</p>
            </div>
          </div>


          <div className="flex md:flex-row flex-col my-6">
            <div className="md:w-1/4 w-full md:order-1 order-2">
              <GamerTags />
            </div>
            <div className="md:ms-8 md:w-1/2 w-full md:order-2 order-1">
              <p className="text-xl">Bio</p>
              <p className="text-clay-700 dark:text-clay-950">{usr.bio}</p>
              <hr className="md:hidden my-5"/>
              
              <UserGenresList userGuid={userGuid} />
              <hr className="md:hidden my-5"/>
            </div>
            <div className="md:w-1/4 w-full md:order-3 order-3">
              <DisplayCurrentGoal currentGoal={currentGoal} />
              <ViewAllGoalsButton />
            </div>
          </div>

          <p className="md:text-4xl mt-8 text-2xl">Your Library</p>
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
