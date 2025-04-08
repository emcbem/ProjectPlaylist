import React, { FC, useState } from "react";
import DateSelector from "../../../../individual_components/DateSelector";
import { Achievement } from "@/@types/achievement";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";
import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { AddAchievementButton } from "../Buttons/AddAchievementButton";
import { SubmitAchievementButton } from "../Buttons/SubmitAchievementButton";
import { AchievementPictureDisplay } from "../AchievementPictureDisplay";
import { GoalQueries } from "@/queries/GoalQueries";
import { UpdateGoalRequest } from "@/@types/Requests/UpdateRequests/updateGoalRequest";
import { GetGoalToCompleteRequest } from "@/@types/Requests/GetRequests/getGoalToCompleteRequest";
import { useModalController } from "@/page_components/Settings/Hooks/useModalController";
import { Modal } from "@/components/ui/modal";

interface props {
  achievement: Achievement;
  userGuid: string;
}

const AchievementModalAdd: FC<props> = ({ achievement, userGuid }) => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");


  const addUserAchievementRequest: AddUserAchievementRequest = {
    dateAchieved: new Date(`${month}/${day}/${year}`),
    userGuid: userGuid ?? "",
    isSelfSubmitted: true,
    achievementId: Number(achievement.id),
  };

  const getGoalToCompleteRequest: GetGoalToCompleteRequest = {
    achievementId: achievement.id,
    userId: userGuid,
  };

  const { data: goalToComplete } = GoalQueries.useGetGoalToComplete(
    getGoalToCompleteRequest
  );

  const updateGoalRequest: UpdateGoalRequest = {
    dateToAchieve: new Date(`${month}/${day}/${year}`),
    isComplete: true,
    isCurrent: false,
    userId: userGuid ?? "",
    id: goalToComplete?.id ?? 0,
  };

  const { mutate: addUserAchievement } =
    UserAchievementQueries.useAddUserAchievement(
      addUserAchievementRequest,
      userGuid
    );

  const { mutate: CompleteGoal } = GoalQueries.useUpdateGoal(
    updateGoalRequest,
    userGuid
  );

  const modalController = useModalController({
    showBottomButtons: false,
    showTopButtons: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addUserAchievement();
    if (goalToComplete?.id !== 0) {
      CompleteGoal();
    }
    () => modalController.setModalVisibility(false);
  };

  return (
    <>
      <AddAchievementButton
        openModal={() => modalController.setModalVisibility(true)}
      />

      <Modal {...modalController}>
        <div className="flex justify-center items-center">
          <AchievementPictureDisplay achievement={achievement} />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5"
          >
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-white">
                Date Earned
              </label>
              <DateSelector
                month={month}
                day={day}
                year={year}
                setMonth={setMonth}
                setDay={setDay}
                setYear={setYear}
              />
            </div>
            <SubmitAchievementButton />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AchievementModalAdd;
