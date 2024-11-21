import { Achievement } from "@/@types/achievement";
import { FC } from "react";

interface props {
  allGamesAchievements: Achievement[] | undefined;
  achievementId: string;
  setAchievementId: (value: string) => void;
}

const GoalSelectComponent: FC<props> = ({
  allGamesAchievements,
  setAchievementId,
  achievementId,
}) => {
  return (
    allGamesAchievements && (
      <div>
        <label className="block text-sm font-medium mb-1">Achievement</label>
        <select
          value={achievementId}
          onChange={(e) => setAchievementId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        >
          <option value="" disabled>
            Select an achievement for the goal
          </option>
          {allGamesAchievements.map((x) => (
            <option key={x.id} value={x.name}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default GoalSelectComponent;
