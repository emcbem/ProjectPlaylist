import { useParams } from "react-router-dom";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import LibraryGameStats from "@/individual_components/ViewLibraryGame/LibrayGameStats";
import AchievementsPage from "../Achievements";
import MyLibraryDescription from "./Components/MyLibraryDescription";
import { useState } from "react";
import GoalModalAdd from "../Goals/Components/Modal/GoalModalAdd";

const ViewLibraryGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: userGame, isLoading } =
    UserGameQueries.useGetUserGameByUserGameId(Number(gameId));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const HandleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const CloseModal = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    userGame && (
      <div>
        <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
          <div className="flex flex-row items-start space-x-4 xl:w-1/2 lg:w-5/6 w-full">
            <div className="flex-shrink-0">
              <img
                src={userGame?.platformGame.game.coverUrl.replace(
                  /t_cover_big/g,
                  "t_1080p"
                )}
                className="lgmd:w-60 lgmd:h-96 sm:h-60 sm:w-36 w-28 h-44 object-cover rounded-lg shadow-xl sticky top-10"
                alt={`${userGame?.platformGame.game?.title} cover`}
              />
            </div>

            <div className="flex-grow">
              <MyLibraryDescription
                userGame={userGame}
                onAddClick={HandleAddModal}
              />

              <div className="hidden md:flex mt-4 flex-col">
                <ul className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-400">
                  <LibraryGameStats userGame={userGame!} />
                  {userGame?.platformGame.achievements.length > 0 && (
                    <AchievementsPage
                      passedGameAchievements={
                        userGame?.platformGame.achievements
                      }
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lgmd:hidden mt-4 flex flex-col space-y-4">
          <LibraryGameStats userGame={userGame!} />
          <ul className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
            {userGame?.platformGame.achievements.length > 0 && (
              <AchievementsPage
                passedGameAchievements={userGame?.platformGame.achievements}
              />
            )}
          </ul>
        </div>
        <div>
          {isAddModalOpen && (
            <GoalModalAdd onClose={CloseModal} userGame={userGame} />
          )}
        </div>
      </div>
    )
  );
};

export default ViewLibraryGame;
