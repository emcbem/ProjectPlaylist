import React from "react";
import { useParams } from "react-router-dom";
import { PlatformGameQueries } from "@/hooks/PlatfromGameQueries";
import AchievementList from "@/individual_components/AchievementList";

const AchievementsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: platformGames } =
    PlatformGameQueries.useGetAllPlatformGamesByGame(Number(gameId));

  const validPlatformIds = [6, 48, 49, 167, 169];

  const hasAchievements = platformGames?.find((x) =>
    validPlatformIds.includes(x.platform.id)
  );

  console.log("huuuuh", hasAchievements?.id);

  return (
    <div className=" dark:text-white text-black">
      <div>
        {platformGames ? (
          hasAchievements && (
            <AchievementList platformGameId={hasAchievements?.id} />
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
