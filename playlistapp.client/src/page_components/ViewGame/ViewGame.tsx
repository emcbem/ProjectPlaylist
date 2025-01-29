import { useParams } from "react-router-dom";
import Tabs from "@/individual_components/Tabs";
import AddButton from "@/individual_components/AddButton";
import { GameQueries } from "@/queries/GameQueries";
import GameCover from "./GameCover";
import ViewGameInfo from "./ViewGameInfo";

const ViewGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game, isLoading } = GameQueries.useGetGameById(Number(gameId));

  if (isLoading) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-8 pt-10">
        Loading...
      </div>
    );
  }

  if (!game || (!game && !isLoading)) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-8 pt-10">
        Error Fetching Game
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-8 pt-10">
        <div className="flex lgmd:flex-row xl:w-1/2 lg:w-5/6 lgmd:w-full">
          <GameCover game={game} />
          <div className="flex flex-col ml-5">
            <ViewGameInfo game={game} />
            <div className="flex justify-start w-full">
              <AddButton gameId={gameId} />
            </div>
            <div className="lgmd:flex hidden">
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 w-full">
                <Tabs />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="lgmd:hidden ">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 w-full mt-12">
          <Tabs />
        </ul>
      </div>
    </>
  );
};

export default ViewGame;
