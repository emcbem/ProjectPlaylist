import React, { FC, useState, useRef } from "react";
import DateSelector from "./DateSelector";
import { Achievement } from "@/@types/achievement";
import { PlatformGame } from "@/@types/platformGame";
import { UserAchievementQueries } from "@/hooks/UserAchievementQueries";
import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";

interface props {
  achievement: Achievement;
  userGuid: string;
  platforms: PlatformGame[];
}

const AchievementModalAdd: FC<props> = ({
  achievement,
  userGuid,
  platforms,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [platform, setPlatform] = useState<PlatformGame | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);


  // console.log(
  //   "WAAARB",
  //   achievement.platformGame.game?.publishDate
  //     ? formatDate(new Date(achievement.platformGame.game?.publishDate))
  //     : "No publish date"
  // );

  const addUserAchievementRequest: AddUserAchievementRequest = {
    dateAchieved: new Date(`${month}/${day}/${year}`),
    userGuid: userGuid ?? "",
    isSelfSubmitted: true,
    achievementId: Number(achievement.id),
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addUserAchievement();
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const handlePlatformClick = (
    event: React.MouseEvent,
    platform: PlatformGame
  ) => {
    event.preventDefault();
    setPlatform(platform);
  };

  return (
    <>
      <button onClick={openModal} className="" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={`w-[35px] h-[35px] md:m-1 ml-1 mb-1 fill-current`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className="text-black dark:text-white"
            d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
          />
        </svg>
      </button>

      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
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
          <div className="mx-5 flex flex-col justify-center items-center">
            <img
              src={achievement.imageURL}
              className="w-40 h-40 object-cover rounded-lg shadow-xl sticky top-10"
              alt={`Achievement`}
            />
            <p>{achievement.name}</p>
          </div>

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

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-white">
                Select Platform
              </label>
              <div className="flex flex-wrap">
                {platforms.map((x) => (
                  <button
                    key={x.id}
                    className={` hover:bg-clay-900 transition-all rounded-md p-2 w-fit m-1 ${
                      platform?.id == x.id ? `bg-clay-900` : `bg-clay-600`
                    }`}
                    onClick={(event) => {
                      handlePlatformClick(event, x);
                    }}
                  >
                    {x.platform.name === "PC (Microsoft Windows)"
                      ? "PC"
                      : x.platform.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 pb-0">
              <button
                className="w-full rounded-md bg-clay-950 py-2 px-4 text-sm text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AchievementModalAdd;
