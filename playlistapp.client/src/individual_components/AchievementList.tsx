import { AchievementQueries } from "@/hooks/AchievementQueries";
import AchievementCard from "./AchievementCard";
import { PlatformGame } from "@/@types/platformGame";

interface props {
  platforms: PlatformGame[];
}

const AchievementsList: React.FC<props> = ({ platforms }) => {
  const { data: achievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(platforms[0].id);

  if (achievements) {
    return achievements.map((achievement, index) => (
      <AchievementCard key={index} achievement={achievement} platforms={platforms}/>
    ));
  } else {
    <h1>Error loading achievements</h1>;
  }
};

export default AchievementsList;
