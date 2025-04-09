import { Goal } from "@/@types/goal";
import formatDate from "@/lib/format_date";

const GoalSetDate = ({ goal }: { goal: Goal }) => {
  return (
    <div className="flex flex-wrap text-lg text-gray-800 dark:text-white">
      <div className="w-1/3">
        <p className="text-nowrap">
          You set this goal on {formatDate(goal.dateAdded)}
        </p>
      </div>
    </div>
  );
};

export default GoalSetDate;
