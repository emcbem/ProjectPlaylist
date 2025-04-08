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
import { GetClaimedAchievementsForGameForUserRequest } from "@/@types/Requests/GetRequests/getClaimedAchievementsForGameForUserRequest";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";
import toast from "react-hot-toast";
import { Modal, ModalController } from "@/components/ui/modal";

interface props {
  userGame: UserGame;
  modalController: ModalController;
}

const GoalModalAdd: FC<props> = ({ userGame, modalController }) => {
  const [achievementId, setAchievementId] = useState<string>("");
  const [isCurrent, setIsCurrent] = useState<boolean>(true);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const { data: allGamesAchievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(
      userGame.platformGame.id
    );

  const getClaimedAchievementsRequest: GetClaimedAchievementsForGameForUserRequest =
    {
      platformGameId: userGame.platformGame.id,
      userId: userGame.user.guid,
    };

  const addGoalRequest: AddGoalRequest = {
    achievementId: Number(achievementId),
    dateToAchieve: new Date(`${month}-${day}-${year}`),
    isCurrent: isCurrent,
    userId: userGame.user.guid,
  };

  const { data: claimedAchievements } =
    UserAchievementQueries.useGetClaimedAchievementsForGameForUser(
      getClaimedAchievementsRequest
    );

  const filteredAchievements = allGamesAchievements?.filter(
    (achievement) =>
      !claimedAchievements?.some((claimed) => claimed.id === achievement.id)
  );

  const { mutate: AddGoal } = GoalQueries.useAddGoal(addGoalRequest);

  const handleAdd = () => {
    AddGoal(undefined, {
      onSuccess: (newId) => {
        if (newId === 0) {
          toast.error("Goal Already Exists");
        } else {
          toast.success("Goal Added");
          modalController.setModalVisibility(false);
        }
      },
      onError: () => {
        toast.error("Failed to add Goal");
      },
    });
  };

  return (
    <Modal {...modalController}>
      {userGame && (
        <div>
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-bold text-center">Add A Goal</h2>
          </div>
          <GoalSelectComponent
            achievementId={achievementId}
            allGamesAchievements={filteredAchievements}
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
          <CancelGoalButton
            onClose={() => modalController.setModalVisibility(false)}
          />
        </div>
      )}
    </Modal>
  );
};

export default GoalModalAdd;
