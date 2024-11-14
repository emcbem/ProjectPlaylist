import { Achievement } from "@/@types/achievement";
import { FC, useContext, useEffect } from "react";
import AchievementModalParent from "./AchievementModalParent";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import { PlatformGame } from "@/@types/platformGame";

interface props {
  achievement: Achievement;
  platforms: PlatformGame[];
}

const AchievementCard: FC<props> = ({ achievement, platforms }) => {
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const { data: userEarnedAchievement, refetch } =
    UserAchievementQueries.useGetUserAchievementByUserId(usr?.guid!);
  console.log(achievement.platformGame.platform.name);

  useEffect(() => {
    if (usr?.guid) {
      refetch();
    }
  }, [usr, refetch]);

  const earnedAchievement =
    userEarnedAchievement &&
    userEarnedAchievement.find((e) => e.achievement.id === achievement.id);

  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
              src={achievement.imageURL}
              alt="Achievement Logo"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-tiny font-medium text-gray-900  dark:text-white">
              {achievement.name}
            </p>
            <p className="md:text-lg sm:text-base text-tiny text-gray-500 dark:text-gray-400">
              {achievement.description}
            </p>
          </div>
          <div className="inline-flex items-center md:text-lg sm:text-base text-sm font-semibold text-gray-900 dark:text-white">
            <div className="relative inline-block md:ml-4 ml-0 cursor-pointer">
              {usr?.guid && (
                <AchievementModalParent
                  achievement={achievement}
                  earned={earnedAchievement!}
                  userGuid={usr.guid}
                  platforms={platforms}
                />
              )}
            </div>
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};

export default AchievementCard;
