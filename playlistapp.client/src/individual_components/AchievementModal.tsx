import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import React, { FC } from "react";
import { useRef, useState } from "react";
import DateSelector from "./DateSelector";

interface props {
  achievementId: number;
  earned: boolean;
  userGuid: string;
}

const AchievementModal: FC<props> = ({ achievementId, earned, userGuid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const addUserAchievementRequest: AddUserAchievementRequest = {
    dateAchieved: new Date(),
    userGuid: userGuid ?? "",
    isSelfSubmitted: true,
    achievementId: Number(achievementId),
  };

  const { mutate: addUserAchievement } =
    UserAchievementQueries.useAddUserAchievement(
      addUserAchievementRequest,
      userGuid
    );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddUserAchievement = () => {
    addUserAchievement();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleAddUserAchievement();

    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal} className="" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={`w-[35px] h-[35px] md:m-1 ml-1 mb-1 fill-current ${
            earned ? `hidden` : `block`
          }`}
          onClick={openModal}
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
            earned ? `block` : `hidden`
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
      </button>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center dark:bg-black bg-white dark:bg-opacity-60 bg-opacity-60  backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-auto rounded-lg overflow-hidden shadow-sm bg-white dark:bg-clay-400 transition-transform duration-300 flex flex-col p-8 animation-fill-mode: forwards;${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5"
          >
            <DateSelector />
            <h2 className="text-3xl mb-4 text-white">
              Are you sure you want to delete this review?
            </h2>
            <p className=" mb-6 text-red-600">
              Warning: Your list review will be deleted forever
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="submit"
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={closeModal}
                type="reset"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AchievementModal;
