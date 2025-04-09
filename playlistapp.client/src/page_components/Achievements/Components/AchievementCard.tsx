import { FC, useContext } from "react";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import AchievementModalParent from "./Modal/AchievementModalParent";
import formatDate from "@/lib/format_date";
import { UserAchivementListItem } from "../Achievements";

interface props {
  achievement: UserAchivementListItem;
  showAddButton: boolean;
}

const AchievementCard: FC<props> = ({ achievement, showAddButton }) => {
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
              src={achievement.Achievement.imageURL}
              alt="Achievement Logo"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-tiny font-medium text-gray-900  dark:text-white">
              {achievement.Achievement.name}{" "}
              {achievement?.Earned?.isSelfSubmitted && (
                <span className="text-sm font-sans font-light text-gray-400">
                  Self Submitted
                </span>
              )}
              <br />
              {achievement?.Earned?.dateAchieved && (
                <span className="text-sm font-sans font-light text-gray-400">
                  {formatDate(achievement?.Earned?.dateAchieved)}
                </span>
              )}
            </p>
            <p className="md:text-lg sm:text-base text-tiny text-gray-500 dark:text-gray-400">
              {usr?.guid && !showAddButton && (
                <p>{achievement.Achievement?.description}</p>
              )}
            </p>
          </div>
          <div className="inline-flex items-center md:text-lg sm:text-base text-sm font-semibold text-gray-900 dark:text-white">
            <div className="relative inline-block md:ml-4 ml-0 cursor-pointer">
              {usr?.guid && showAddButton && (
                <AchievementModalParent
                  achievement={achievement.Achievement}
                  earned={achievement.Earned!}
                  userGuid={usr.guid}
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
