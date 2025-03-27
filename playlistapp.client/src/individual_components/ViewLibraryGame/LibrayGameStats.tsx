import { UserAccount } from "@/@types/userAccount";
import NumberTicker from "@/components/ui/number-ticker";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";
import { FC, useState } from "react";
import Gauge from "../Gauge";
import { UserGame } from "@/@types/usergame";
import AddGoalButton from "@/page_components/Goals/Components/Buttons/AddGoalButton";
import GoalModalAdd from "@/page_components/Goals/Components/Modal/GoalModalAdd";
import ShineBorder from "@/components/ui/shine-border";
import { useParams } from "react-router-dom";

const LibraryGameStats: FC<{ usr: UserAccount; userGame: UserGame }> = ({
  usr,
  userGame,
}) => {
  const { id } = useParams<{ id: string }>();
  const userId = id ?? usr?.guid;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const HandleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const CloseModal = () => {
    setIsAddModalOpen(false);
  };

  const {
    data: userEarnedAchievement,
    isLoading,
    error,
  } = UserAchievementQueries.useGetUserAchievementByUserId(userId ?? "");

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

  //dark:shadow-[0px_0px_35px_8px_rgba(77,35,66,1)] shadow-[0px_0px_35px_8px_rgba(245,159,137,1)]
  console.log(userGame, "like what");

  return userEarnedAchievement && userGame ? (
    <div>
      <ShineBorder
        className="aspect-[3/4] min-h-96 my-8 border shadow-xl dark:shadow-[#182225] dark:border-[#182225] lg:w-fit rounded-xl flex flex-col items-start"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        borderWidth={6}
      >
        <>
          <div className="flex md:flex-col flex-row items-center justify-between lg:p-4 p-0 w-full">
            <div className="md:flex-shrink-0 mb-4 md:mb-0 md:p-4 p-0 flex-col flex items-center">
              <div className="text-lg font-bold dark:text-white text-black">
                Achievements
              </div>
              {userGame.platformGame.achievements.length > 0 ? (
                <Gauge
                  totalAchievments={
                    userGame?.platformGame?.achievements?.length ?? 0
                  }
                  earnedAchievements={earned?.length ?? 0}
                />
              ) : (
                <div className="text-base my-4 font-bold dark:text-white text-black">
                  No achievements found for this title
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="text-lg font-bold dark:text-white text-black">
                Total Hours Played
              </div>
              <div className="text-5xl">
                {userGame && userGame.timePlayed > 0 ? (
                  <NumberTicker
                    value={parseFloat((userGame.timePlayed / 60).toFixed(2))}
                    decimalPlaces={1}
                  />
                ) : (
                  <p className="text-5xl">0</p>
                )}
              </div>
              <AddGoalButton onAddClick={HandleAddModal} />
            </div>
          </div>
        </>
      </ShineBorder>
      <div>
        {isAddModalOpen && (
          <GoalModalAdd onClose={CloseModal} userGame={userGame} />
        )}
      </div>
    </div>
  ) : (
    <p>No data available.</p>
  );
};

export default LibraryGameStats;
