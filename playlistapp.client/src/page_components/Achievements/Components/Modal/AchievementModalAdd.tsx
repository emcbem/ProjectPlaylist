import React, { FC, useState, useRef } from "react";
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

interface props {
  achievement: Achievement;
  userGuid: string;
}

const AchievementModalAdd: FC<props> = ({ achievement, userGuid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addUserAchievement();
    if (goalToComplete?.id !== 0) {
      CompleteGoal();
    }
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <AddAchievementButton openModal={openModal} />

      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[10000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
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
      </div>
    </>
  );
};

export default AchievementModalAdd;
