import { UserGame } from "@/@types/usergame";
import { FC, useState } from "react";
import CancelGoalButton from "../Buttons/CancelGoalButton";
import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { AchievementQueries } from "@/queries/AchievementQueries";
import GoalDateSelector from "./GoalDateSelector";
import { GoalQueries } from "@/queries/GoalQueries";
import GoalAddButton from "./GoalAddButton";
import GoalSelectComponent from "./GoalSelectComponent";
import CheckBox from "@/individual_components/Checkbox";

interface props {
  userGame: UserGame;
  onClose: () => void;
}

const GoalModalAdd: FC<props> = ({ userGame, onClose }) => {
  const [achievementId, setAchievementId] = useState<string>("");
  const [isCurrent, setIsCurrent] = useState<boolean>(true);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const { data: allGamesAchievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(
      userGame.platformGame.id
    );

  const { data: achievement } = AchievementQueries.useGetAchievementById(
    Number(achievementId)
  );

  const addGoalRequest: AddGoalRequest = {
    achievementId: achievement?.id ?? 0,
    dateToAchieve: new Date(`${month}-${day}-${year}`),
    isCurrent: isCurrent,
    userId: userGame.user.guid,
  };

  const { mutate: AddGoal } = GoalQueries.useAddGoal(addGoalRequest);

  const handleAdd = () => {
    AddGoal();
    onClose();
  };

  return (
    userGame && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
        <div className="dark:bg-clay-400 bg-gray-100 p-6 rounded shadow-md sm:w-1/2 sm:mx-0 w-full mx-4">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-bold text-center">Add A Goal</h2>
          </div>
          <GoalSelectComponent
            achievementId={achievementId}
            allGamesAchievements={allGamesAchievements}
            setAchievementId={setAchievementId}
          />
          <div className="flex items-center justify-center pt-2">
            <CheckBox
              value={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              title="Is Current Goal"
            />
          </div>
          <GoalDateSelector
            month={month}
            day={day}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
          />
          <GoalAddButton handleAdd={handleAdd} />
          <CancelGoalButton onClose={onClose} />
        </div>
      </div>
    )
  );
};

export default GoalModalAdd;
