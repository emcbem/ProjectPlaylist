import { FC } from "react";
import formatDate from "@/lib/format_date";
import { WrapUpAchievement } from "@/@types/WrapUps/WrapUpAchievement";

interface props {
  achievement: WrapUpAchievement;
}

const AchievementCard: FC<props> = ({ achievement }) => {
  return (
    <>
      <div className="py-3 sm:pb-4 m-1 dark:bg-gray-800 bg-gray-100 p-3 rounded-xl">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
              src={achievement.achievementImageUrl}
              alt="Achievement Logo"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl font-medium text-gray-900  dark:text-white">
              {achievement.achievementName} <br />
              {achievement?.dateEarned && (
                <span className="text-sm font-sans font-light dark:text-gray-400 text-gray-600">
                  {formatDate(achievement.dateEarned)}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementCard;
