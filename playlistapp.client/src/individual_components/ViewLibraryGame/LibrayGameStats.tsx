import { UserAccountContextInterface } from "@/@types/userAccount";
import NumberTicker from "@/components/ui/number-ticker";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import { FC, useContext } from "react";
import Gauge from "../Gauge";
import { UserGame } from "@/@types/usergame";

const LibraryGameStats: FC<{ userGame: UserGame }> = ({ userGame }) => {
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const {
    data: userEarnedAchievement,
    isLoading,
    error,
  } = UserAchievementQueries.useGetUserAchievementByUserId(usr?.guid!);

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
    <div className="h-fit shadow-xl w-fit rounded-xl flex flex-col items-start py-3 mx-8 sticky top-10">
      {userGame.platformGame.achievements.length > 0 && (
        <>
          <div className="flex flex-col items-start dark:text-white text-black">
            <h1>Your Progress</h1>
            <div className="p-4 pl-0">
              <Gauge
                totalAchievments={
                  userGame?.platformGame?.achievements?.length ?? 0
                }
                earnedAchievements={earned?.length ?? 0}
              />
            </div>
          </div>

          <div className="flex flex-col items-start dark:text-white text-black">
            <h1>Achievement Count</h1>
            <div className="p-4 pl-0 flex flex-row text-5xl">
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
          </div>
        </>
      )}
      <div className="flex flex-col items-start dark:text-white text-black">
        <h1>Hours Played</h1>
        <div className="p-4 pl-0">
          {userGame && userGame.timePlayed > 0 ? (
            <NumberTicker value={userGame.timePlayed} className="text-5xl" />
          ) : (
            <p className="text-5xl">0</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p>No data available.</p>
  );
};

export default LibraryGameStats;
