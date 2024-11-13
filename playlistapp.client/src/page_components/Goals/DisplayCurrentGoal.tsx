import { Goal } from "@/@types/goal";
import formatDate from "@/lib/date";

type DisplayCurrentGoalProps = {
  currentGoal: Goal | undefined;
};

const DisplayCurrentGoal: React.FC<DisplayCurrentGoalProps> = ({
  currentGoal,
}) => {
  return (
    currentGoal && (
      <div className="">
        <p className="text-xl">Current Goal</p>
        <div>
          <p>
            Your goal is to complete the achievement{" "}
            {currentGoal.achievement.name} from the game{" "}
            {currentGoal.achievement.platformGame.game.title} by{" "}
            {formatDate(currentGoal.dateToAchieve)}!
          </p>
        </div>
      </div>
    )
  );
};

export default DisplayCurrentGoal;
