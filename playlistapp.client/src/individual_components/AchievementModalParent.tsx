import { FC } from "react";
import { Achievement } from "@/@types/achievement";
import AchievementModalRemove from "./AchievementModalRemove";
import AchievementModalAdd from "./AchievementModalAdd";
import { UserAchievement } from "@/@types/userAchievement";

interface props {
  achievement: Achievement;
  earned: UserAchievement;
  userGuid: string;
}

const AchievementModalParent: FC<props> = ({
  achievement,
  earned,
  userGuid,
}) => {
  return (
    <>
      {earned ? (
        <AchievementModalRemove
          userAchievementId={earned.id}
          userGuid={userGuid}
        />
      ) : (
        <AchievementModalAdd
          achievement={achievement}
          userGuid={userGuid}
        />
      )}
    </>
  );
};

export default AchievementModalParent;
