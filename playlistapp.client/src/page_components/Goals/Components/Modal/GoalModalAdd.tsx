import { UserGame } from "@/@types/usergame";
import { FC, useState } from "react";
import CancelGoalButton from "../Buttons/CancelGoalButton";
import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import { AchievementQueries } from "@/hooks/AchievementQueries";
import GoalDateSelector from "./GoalDateSelector";
import { GoalQueries } from "@/hooks/GoalQueries";
import GoalAddButton from "./GoalAddButton";
import EditGoalCheckbox from "./EditGoalCheckbox";
import GoalSelectComponent from "./GoalSelectComponent";

interface props {
  userGame: UserGame;
  onClose: () => void;
}

const GoalModalAdd: FC<props> = ({ userGame, onClose }) => {
  const [achievementId, setAchievementId] = useState("");
  const [isCurrent, setIsCurrent] = useState<boolean>(true);
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();
  const [year, setYear] = useState<string>();

  const { data: allGamesAchievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(
      userGame.platformGame.id
    );

  const { data: achievement } = AchievementQueries.useGetAchievementById(
    Number(achievementId)
  );

  const addGoalRequest: AddGoalRequest = {
    achievementId: achievement?.id ?? 0,
    dateToAchieve: new Date(`${month}/${day}/${year}`),
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
            <h2 className="text-lg font-bold text-center">Edit Goal</h2>
          </div>
          <GoalSelectComponent
            achievementId={achievementId}
            allGamesAchievements={allGamesAchievements}
            setAchievementId={setAchievementId}
          />
          <EditGoalCheckbox
            title="Curren"
            isChecked={false}
            setCheckbox={setIsCurrent}
          />
          <GoalDateSelector
            month={""}
            day={""}
            year={""}
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
