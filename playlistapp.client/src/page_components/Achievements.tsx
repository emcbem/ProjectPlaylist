import React from "react";
import { useParams } from "react-router-dom";
import { PlatformGameQueries } from "@/hooks/PlatfromGameQueries";
import AchievementPlatfrom from "@/individual_components/AchievementPlatfrom";

const AchievementsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: platformGames } =
    PlatformGameQueries.useGetAllPlatformGamesByGame(Number(gameId));

  console.log("pfg", platformGames);

  return (
    <div className=" dark:text-white text-black">
      <div className="">
        {platformGames ? (
          platformGames.map((item, index) => (
            <AchievementPlatfrom
              key={index}
              platformGame={item}
              showAddButton={true}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
