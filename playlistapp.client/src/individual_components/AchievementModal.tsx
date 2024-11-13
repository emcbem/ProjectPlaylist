import { FC } from "react";
import { Achievement } from "@/@types/achievement";
import { PlatformGame } from "@/@types/platformGame";
import AchievementModalRemove from "./AchievementModalRemove";
import AchievementModalAdd from "./AchievementModalAdd";
import { UserAchievement } from "@/@types/userAchievement";

interface props {
  achievement: Achievement;
  earned: UserAchievement;
  userGuid: string;
  platforms: PlatformGame[];
}

const AchievementModal: FC<props> = ({
  achievement,
  earned,
  userGuid,
  platforms,
}) => {
  return (
    <>
      {earned ? (
        <AchievementModalRemove userAchievementId={earned.id} userGuid={userGuid} />
      ) : (
        <AchievementModalAdd
          achievement={achievement}
          userGuid={userGuid}
          platforms={platforms}
        />
      )}
    </>
  );
};

export default AchievementModal;
