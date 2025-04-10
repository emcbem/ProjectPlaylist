import { FC } from "react";
import formatDate from "@/lib/format_date";
import { WrapUpAchievement } from "@/@types/WrapUps/WrapUpAchievement";

interface props {
  achievement: WrapUpAchievement;
}

const AchievementCard: FC<props> = ({ achievement }) => {
  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
              src={achievement.achievementImageUrl}
              alt="Achievement Logo"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-tiny font-medium text-gray-900  dark:text-white">
              {achievement.achievementName} <br />
              {achievement?.dateEarned && (
                <span className="text-sm font-sans font-light text-gray-400">
                  {formatDate(achievement.dateEarned)}
                </span>
              )}
            </p>
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};

export default AchievementCard;
