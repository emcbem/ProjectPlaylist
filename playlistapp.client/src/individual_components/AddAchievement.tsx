import { FC, useState } from "react";
import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { UserAchievement } from "@/@types/userAchievement";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import AchievementModal from "./AchievementModal";

const AddAchievement: FC<{
  achievementId: number;
  earned: UserAchievement[];
  userGuid: string;
}> = ({ achievementId, userGuid, earned }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const addUserAchievementRequest: AddUserAchievementRequest = {
    dateAchieved: new Date(),
    userGuid: userGuid ?? "",
    isSelfSubmitted: true,
    achievementId: Number(achievementId),
  };

  const { mutate } = UserAchievementQueries.useAddUserAchievement(
    addUserAchievementRequest,
    userGuid
  );

  const earnedAchievement = earned.find(
    (e) => e.achievement.id === achievementId
  );

  const handleAddUserAchievement = () => {
    mutate();
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal on click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal on click
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-[35px] h-[35px] md:m-1 ml-1 mb-1 fill-current ${
          earnedAchievement ? `hidden` : `block`
        }`}
        onClick={openModal} // Open modal when this SVG is clicked
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          className="text-black dark:text-white"
          d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-[35px] h-[35px] md:m-1 ml-1 mb-1 fill-green-600 ${
          earnedAchievement ? `block` : `hidden`
        }`}
        onClick={openModal}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          className="text-black dark:text-white"
          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM10 14.5L8.5 13L7.5 14L10 16.5L16.5 10L15.5 9L10 14.5Z"
        />
      </svg>

      {isModalOpen && (
        <AchievementModal gameReviewId={achievementId} onClose={closeModal} />
      )}
    </>
  );
};

export default AddAchievement;
