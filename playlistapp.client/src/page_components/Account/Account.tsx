import React, { useEffect, useState } from "react";
import "./Account.modules.scss";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import PlaylistLists from "./PlaylistLists";
import LibraryList from "./LibraryViewsComponents/LibraryList";
import LibraryListNoGames from "./LibraryViewsComponents/LibraryListNoGames";
import { UserGameQueries } from "@/queries/UserGameQueries";
import UserGenresList from "./UserGenresList";
import DisplayCurrentGoal from "../Goals/DisplayCurrentGoal";
import { GoalQueries } from "@/queries/GoalQueries";
import { Goal } from "@/@types/goal";
import ViewAllGoalsButton from "../Goals/Components/Buttons/ViewAllGoalsButton";
import GamerTags from "./GamerTags";
import ExpandableBio from "./Bio";
import LoadingPage from "@/individual_components/LoadingPage";
import { UserGenreQueries } from "@/queries/UserGenreQueries";
import { Link, useParams } from "react-router-dom";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import FriendStatus from "../SearchUsers/FriendStatus";
import MuteBtn from "./MuteBtn";
import { FriendQueries } from "@/queries/FriendQueries";

const Account = () => {
  const { id } = useParams<{ id: string }>();

  const { userGuid, isLoading: isUserLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const userId = id ?? userGuid;

  const { data: usr } = UserAccountQueries.useGetUserById(userId!);

  const { data: friends } = FriendQueries.GetAllFriendsByBaseIdQuery(
    userId ?? ""
  );

  const isFriend = friends?.some((friend) => friend.guid === userGuid);

  const {
    data: userGamesFromUser,
    isLoading,
    isSuccess,
  } = UserGameQueries.useGetAllUserGamesByUser(userId ?? "");

  const {
    data: allUserGoals,
    isSuccess: isGettingGoalsSuccess,
    isLoading: goalLoading,
  } = GoalQueries.useGetGoalsByUser(userId ?? "");

  const { data: userGenres, isLoading: loadingGenres } =
    UserGenreQueries.useGetAllByUser(userId ?? "");

  const [currentGoal, setCurrentGoal] = useState<Goal | undefined>(undefined);

  useEffect(() => {
    const foundCurrentGoal = allUserGoals?.find((x) => x.isCurrent === true);
    setCurrentGoal(foundCurrentGoal);
  }, [allUserGoals]);

  if (isLoading || isUserLoading || goalLoading || loadingGenres) {
    return (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <LoadingPage />
      </div>
    );
  }

  return (
    usr?.profileURL &&
    isSuccess &&
    isGettingGoalsSuccess &&
    userGenres && (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
        <div className="m-8 w-full" style={{ maxWidth: "1200px" }}>
          <div className="flex flex-wrap">
            <div className="flex flex-col justify-center items-center">
              <img
                className="rounded-full md:w-24 w-14 shadow-inner border-2  dark:bg-clay-600 bg-white dark:border-clay-950 border-black"
                src={usr?.profileURL}
              />
              {id && (
                <div className="mt-2">
                  <FriendStatus user={usr} />
                </div>
              )}
            </div>
            <div className="">
              <div className="flex flex-row mb-1">
                <p className="md:text-4xl text-2xl ms-8">{usr.username}</p>
                {isFriend && <MuteBtn usr={usr} userGuid={userGuid!} />}
              </div>
              <div className="flex flex-row">
                <p className="md:text-2xl text-lg ms-8">
                  {usr?.xp == 0 ? 0 : usr?.xp} Xp
                </p>
                <p className="md:text-2xl text-lg ms-8">
                  {usr.totalTrophies ?? 0} Trophies
                </p>
                <Link
                  to={id ? `/user/${usr.guid}/friends` : `/account/friends`}
                  className="md:text-2xl text-lg ms-8 hover:underline cursor-pointer"
                >
                  {friends?.length ?? 0} Friends
                </Link>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col my-6">
            <div className="md:w-1/4 w-full md:order-1 order-2">
              <GamerTags userGuid={usr.guid} usr={usr} />
            </div>
            <div className="md:ms-8 md:w-1/2 w-full md:order-2 order-1">
              <ExpandableBio bio={usr.bio} />
              <hr className="md:hidden my-5" />
              <UserGenresList userGenres={userGenres} />
              <hr className="md:hidden my-5" />
            </div>
            <div className="md:w-1/4 w-full md:order-3 order-3">
              <DisplayCurrentGoal currentGoal={currentGoal} />
              <ViewAllGoalsButton />
            </div>
          </div>
          {id ? (
            <p className="md:text-4xl mt-8 text-3xl">
              {usr.username}'s Library
            </p>
          ) : (
            <p className="md:text-4xl mt-8 text-3xl">Your Library</p>
          )}
          {!isLoading && userGamesFromUser && userGamesFromUser.length > 0 && (
            <LibraryList
              userGamesFromUser={userGamesFromUser}
              usrGuid={usr.guid}
            />
          )}
          {!isLoading && userGamesFromUser.length <= 0 && (
            <LibraryListNoGames />
          )}

          <PlaylistLists usr={usr} />
        </div>
      </div>
    )
  );
};

export default Account;
