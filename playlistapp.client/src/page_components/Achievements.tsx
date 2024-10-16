import React from "react";
import { useParams } from "react-router-dom";
import { PlatformGameQueries } from "@/hooks/PlatfromGameQueries";
import AchievementPlatfrom from "@/individual_components/AchievementPlatfrom";

const AchievementsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: platformGames } =
    PlatformGameQueries.useGetAllPlatformGamesByGameId(Number(gameId));

  // console.log(gameId);

  return (
    <div className="flex-grow w-full dark:text-white text-black">
      <div className="mx-auto max-w-screen-xl">
        {platformGames?.map((item, index) => (
          <AchievementPlatfrom
            key={index}
            gameId={Number(gameId)}
            platformGame={item}
            showAddButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
