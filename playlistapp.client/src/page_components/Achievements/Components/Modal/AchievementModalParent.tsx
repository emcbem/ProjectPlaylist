import { FC } from "react";
import { Achievement } from "@/@types/achievement";
import { UserAchievement } from "@/@types/userAchievement";
import AchievementModalRemove from "./AchievementModalRemove";
import AchievementModalAdd from "./AchievementModalAdd";
import { useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {earned ? (
        !id ? (
          <AchievementModalRemove
            userAchievementId={earned.id}
            userGuid={userGuid}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-[35px] h-[35px] md:m-1 ml-1 mb-1 fill-green-600`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              className="text-black dark:text-white"
              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM10 14.5L8.5 13L7.5 14L10 16.5L16.5 10L15.5 9L10 14.5Z"
            />
          </svg>
        )
      ) : (
        !id && (
          <AchievementModalAdd achievement={achievement} userGuid={userGuid} />
        )
      )}
    </>
  );
};

export default AchievementModalParent;
