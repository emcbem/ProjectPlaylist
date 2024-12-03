import React from "react";
import { useParams } from "react-router-dom";
import AchievementList from "@/individual_components/AchievementList";
import { GameQueries } from "@/hooks/GameQueries";
import { Achievement } from "@/@types/achievement";

const AchievementsPage: React.FC<{
  passedGameAchievements?: Achievement[];
}> = ({ passedGameAchievements }) => {
  const { gameId } = useParams<{ gameId: string }>();


  const allAchievements =
    passedGameAchievements ??
    Array.from(
      new Map(
        GameQueries.useGetGameById(Number(gameId))
          ?.data?.platforms.flatMap((platform) => platform.achievements)
          .map((achievement) => [achievement.name, achievement]) ?? []
      ).values()
    );

  return (
    <div className="dark:text-white text-black w-full">
      <div>
        {allAchievements ? (
          allAchievements.length > 0 ? (
            <AchievementList achievements={allAchievements} showAddButton={passedGameAchievements ? true : false} />
          ) : (
            <p className="sm:text-sm text-tiny font-medium text-clay-950 dark:text-clay-900 text-center">
              No Achievements for this game
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
