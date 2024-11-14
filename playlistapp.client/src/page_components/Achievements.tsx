import React from "react";
import { useParams } from "react-router-dom";
import { PlatformGameQueries } from "@/hooks/PlatfromGameQueries";
import AchievementList from "@/individual_components/AchievementList";

const AchievementsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: platformGames } =
    PlatformGameQueries.useGetAllPlatformGamesByGame(Number(gameId));

  const validPlatformIds = [6, 48, 49, 167, 169];

  const matchingPlatformGames = platformGames?.filter((x) =>
    validPlatformIds.includes(x.platform.id)
  );

  console.log("huuuuh", matchingPlatformGames);

  return (
    <div className=" dark:text-white text-black">
      <div>
        {platformGames && matchingPlatformGames ? (
          matchingPlatformGames?.length > 0 ? (
            <AchievementList platforms={matchingPlatformGames} />
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
