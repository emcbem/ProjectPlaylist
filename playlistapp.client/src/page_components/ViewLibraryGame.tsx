import { useParams } from "react-router-dom";
import formatDate from "@/lib/date";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import LibraryGameStats from "@/individual_components/ViewLibraryGame/LibrayGameStats";
import AchievementsPage from "./Achievements";

const ViewLibraryGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: userGame, isLoading } =
    UserGameQueries.useGetUserGameByUserGameId(Number(gameId));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        <div className="flex lgmd:flex-row xl:w-1/2 lg:w-5/6 lgmd:w-full">
          <img
            src={userGame?.platformGame.game.coverUrl.replace(
              /t_cover_big/g,
              "t_1080p"
            )}
            className="lgmd:w-60 lgmd:h-96 sm:h-60 sm:w-36 w-28 h-44 object-cover rounded-lg shadow-xl sticky top-10"
            alt={`${userGame?.platformGame.game?.title} cover`}
          />
          <div className="flex flex-col ml-5 w-full">
            <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl sm:text-2xl text-base">
              {userGame?.platformGame.game?.title}
            </h1>
            <p className="text-clay-950 dark:text-clay-900"></p>
            <p className="text-clay-950 dark:text-clay-900">
              {userGame?.platformGame.platform.name} -&nbsp;
              {userGame?.platformGame.game?.companies[0].name}{" "}
              -&nbsp;Released&nbsp;
              {userGame?.platformGame.game?.publishDate
                ? formatDate(new Date(userGame?.platformGame.game.publishDate))
                : "No publish date"}
            </p>
            <h1 className="dark:text-white text-black sm:text-base text-tiny line-clamp-3 my-3 ">
              {userGame?.platformGame.game?.description}
            </h1>

            <div className="lgmd:flex hidden">
              <ul className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
                <LibraryGameStats userGame={userGame!} />
                {userGame && userGame?.platformGame.achievements.length > 0 && (
                  <AchievementsPage
                    passedGameAchievements={userGame?.platformGame.achievements}
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLibraryGame;
