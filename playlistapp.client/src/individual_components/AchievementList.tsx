import { AchievementQueries } from "@/hooks/AchievementQueries";
import AchievementCard from "./AchievementCard";

interface props {
  platformGameId: number;
}

const AchievementsList: React.FC<props> = ({ platformGameId }) => {
  const { data: achievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(platformGameId);

  if (achievements) {
    return achievements.map((achievement, index) => (
      <AchievementCard key={index} achievement={achievement} />
    ));
  } else {
    <h1>Error loading achievements</h1>;
  }
};

export default AchievementsList;
