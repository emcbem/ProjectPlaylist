import { UserAchivementListItem } from "../Achievements";
import AchievementCard from "./AchievementCard";

interface props {
  achievements: UserAchivementListItem[];
  showAddButton: boolean;
}

const AchievementsList: React.FC<props> = ({ achievements, showAddButton }) => {
  if (achievements) {
    return achievements.map((achievement, index) => (
      <AchievementCard
        key={index}
        achievement={achievement}
        showAddButton={showAddButton}
      />
    ));
  } else {
    <h1>Error loading achievements</h1>;
  }
};

export default AchievementsList;
