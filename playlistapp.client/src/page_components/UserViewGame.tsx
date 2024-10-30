import { useParams } from "react-router-dom";
import Tabs from "@/individual_components/Tabs";
import AddButton from "@/individual_components/AddButton";
import { GameQueries } from "@/hooks/GameQueries";

const UserViewGame = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: game } = GameQueries.useGetGameByIdQuery(Number(gameId));

  return (
    <>
      <div className="flex w-full dark:text-white text-black justify-center mt-28">
        <div className="flex lgmd:flex-row xl:w-1/2 lg:w-5/6 lgmd:w-full">
          <img
            src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
            className="lgmd:w-60 lgmd:h-96 h-60 w-36 object-cover rounded-lg shadow-xl sticky top-10"
            alt={`${game?.title} cover`}
          />
          <div className="flex flex-col ml-5">
            <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl text-2xl">
              {game?.title}
            </h1>
            <h1 className="text-yellow-500 text-base font-extrabold my-3">
              9.25/10 - Leave a rating
            </h1>
            <h1 className="dark:text-white text-black text-base line-clamp-3">
              {game?.description}
            </h1>
            <div>
              <AddButton gameId={gameId} />
            </div>
            <div className="lgmd:flex hidden">
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <Tabs />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="lgmd:hidden ">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <Tabs />
        </ul>
      </div>
    </>
  );
};

export default UserViewGame;
