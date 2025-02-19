import { useParams } from "react-router-dom";
import { UserGameQueries } from "@/queries/UserGameQueries";
import LibraryGameStats from "@/individual_components/ViewLibraryGame/LibrayGameStats";
import AchievementsPage from "../Achievements/Achievements";
import MyLibraryDescription from "./Components/MyLibraryDescription";
import LibraryGameCover from "./LibraryGameCover";

const ViewLibraryGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: userGame, isLoading } =
    UserGameQueries.useGetUserGameByUserGameId(Number(gameId));
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    userGame && (
      <div>
        <div className="flex w-full dark:text-white text-black justify-center sm:mt-8 pt-10">
          <div className="flex flex-row items-start space-x-4 xl:w-1/2 lg:w-5/6 w-full">
            <div className="flex flex-col lg:sticky top-[7.5rem]">
              <LibraryGameCover
                game={userGame?.platformGame.game}
                platform={userGame?.platformGame.platform}
              />
              <LibraryGameStats userGame={userGame!} />
            </div>

            <div className="flex-grow">
              <MyLibraryDescription userGame={userGame} />

              <div className="hidden md:flex mt-4 flex-col">
                <ul className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-400">
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
      </div>
    )
  );
};

export default ViewLibraryGame;
