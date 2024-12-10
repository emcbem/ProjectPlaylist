import React from "react";
import { useParams } from "react-router-dom";
import { GameQueries } from "@/queries/GameQueries";
import { Achievement } from "@/@types/achievement";
import AchievementList from "./Components/AchievementList";

interface AchievementsPageProps {
  passedGameAchievements?: Achievement[];
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({
  passedGameAchievements,
}) => {
  const { gameId } = useParams<{ gameId?: string }>();

  const gameData = GameQueries.useGetGameById(Number(gameId))?.data;

  const allAchievements = React.useMemo(() => {
    if (passedGameAchievements) return passedGameAchievements;

    if (!gameData) return [];

    const achievements = gameData.platforms.flatMap(
      (platform) => platform.achievements
    );

    return Array.from(
      new Map(achievements.map((ach) => [ach.name, ach])).values()
    );
  }, [passedGameAchievements, gameData]);

  if (!allAchievements) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dark:text-white text-black w-full">
      {allAchievements.length > 0 ? (
        <AchievementList
          achievements={allAchievements}
          showAddButton={!!passedGameAchievements}
        />
      ) : (
        <p className="sm:text-sm text-tiny font-medium text-clay-950 dark:text-clay-900 text-center">
          No Achievements for this game
        </p>
      )}
    </div>
  );
};

export default AchievementsPage;
