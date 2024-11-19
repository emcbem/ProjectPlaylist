import { Goal } from "@/@types/goal";

const GoalAchievementCard = ({ goal }: { goal: Goal }) => {
  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-clay-100 rounded-lg p-6">
      <img
        src={goal.achievement.imageURL}
        alt={goal.achievement.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h3 className="lg:text-4xl sm:text-3xl text-xl font-bold text-gray-900 dark:text-white">
          {goal.achievement.name}
        </h3>
        <p className="text-gray-700 text-lg dark:text-slate-50">
          {goal.achievement.description}
        </p>
      </div>
    </div>
  );
};

export default GoalAchievementCard;
