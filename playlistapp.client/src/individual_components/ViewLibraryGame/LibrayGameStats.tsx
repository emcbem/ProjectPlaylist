import { UserAccountContextInterface } from "@/@types/userAccount";
import NumberTicker from "@/components/ui/number-ticker";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";
import { FC, useContext } from "react";
import Gauge from "../Gauge";
import { UserGame } from "@/@types/usergame";

const LibraryGameStats: FC<{ userGame: UserGame }> = ({ userGame }) => {
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const {
    data: userEarnedAchievement,
    isLoading,
    error,
  } = UserAchievementQueries.useGetUserAchievementByUserId(usr?.guid ?? "");

  if (!usr?.guid) {
    return <p>Error: User not logged in.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user achievements.</p>;
  }

  const earned =
    userEarnedAchievement &&
    userEarnedAchievement.filter(
      (e) => e.achievement.platformGame.id === userGame.platformGame.id
    );

  return userEarnedAchievement && userGame ? (
    <div className="h-fit min-w-fit shadow-xl dark:shadow-pppurple-600 shadow-pporange-300 lg:w-fit rounded-xl flex flex-col items-start py-3 md:mx-8 mx-2 lg:sticky top-10 p-2">
      {userGame.platformGame.achievements.length > 0 && (
        <>
          <div className="flex md:flex-col flex-row items-center justify-between lg:p-4 p-0 w-full">
            <div className="md:flex-shrink-0 mb-4 md:mb-0 md:p-4 md:pl-0 p-0 flex-grow">
              <Gauge
                totalAchievments={
                  userGame?.platformGame?.achievements?.length ?? 0
                }
                earnedAchievements={earned?.length ?? 0}
              />
            </div>

            <div className="flex flex-col items-end ml-auto mt-4 md:mt-0">
              <div className="text-lg font-bold dark:text-white text-black mb-2">
                Achievement Count
              </div>
              <div className="flex flex-row text-5xl mb-4">
                {earned && earned.length > 0 ? (
                  <NumberTicker value={earned.length} />
                ) : (
                  <p className="text-5xl">0</p>
                )}
                <p>/</p>
                <NumberTicker
                  value={userGame?.platformGame?.achievements?.length}
                />
              </div>

              <div className="text-lg font-bold dark:text-white text-black">
                Hours Played
              </div>
              <div className="text-5xl">
                {userGame && userGame.timePlayed > 0 ? (
                  <NumberTicker value={userGame.timePlayed} />
                ) : (
                  <p className="text-5xl">0</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <p>No data available.</p>
  );
};

export default LibraryGameStats;
