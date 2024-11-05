import { useParams } from "react-router-dom";
import Tabs from "@/individual_components/Tabs";
import AddButton from "@/individual_components/AddButton";
import { GameQueries } from "@/hooks/GameQueries";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import { useEffect, useState } from "react";

const UserViewGame = () => {
  const [avgReview, setAvgReview] = useState<number | null>();
  const { gameId } = useParams<{ gameId: string }>();

  const { data: game } = GameQueries.useGetGameById(Number(gameId));

  const { data: AllGameReviewsForGame } =
    GameReviewQueries.useGetAllGameReviewsByGame(parseInt(gameId ?? "1"));

  useEffect(() => {
    if (AllGameReviewsForGame && AllGameReviewsForGame.length > 0) {
      const totalRating = AllGameReviewsForGame.reduce(
        (acc, obj) => acc + obj.rating,
        0
      );
      const averageRating = totalRating / AllGameReviewsForGame.length;
      setAvgReview(averageRating);
    } else {
      setAvgReview(null);
    }
  }, [AllGameReviewsForGame]);

  return (
    <>
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        <div className="flex lgmd:flex-row xl:w-1/2 lg:w-5/6 lgmd:w-full">
          <img
            src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
            className="lgmd:w-60 lgmd:h-96 sm:h-60 sm:w-36 w-28 h-44 object-cover rounded-lg shadow-xl sticky top-10"
            alt={`${game?.title} cover`}
          />
          <div className="flex flex-col ml-5">
            <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl sm:text-2xl text-base">
              {game?.title}
            </h1>
            {avgReview ? (
              <div
                className={`sm:text-base text-tiny font-extrabold my-3 flex flex-row ${
                  avgReview <= 10.0 && avgReview >= 8.0
                    ? `text-yellow-500`
                    : avgReview < 8.0 && avgReview >= 6.0
                    ? `text-green-700`
                    : avgReview < 6.0 && avgReview >= 3.0
                    ? `text-orange-400`
                    : avgReview < 3.0 && avgReview >= 0.0
                    ? `text-red-700`
                    : ``
                }`}
              >
                <h1>{avgReview}/10&nbsp;-&nbsp;</h1>
                <h1 className="underline cursor-pointer">Leave a rating</h1>
              </div>
            ) : (
              <div
                className={`flex flex-row sm:text-base text-tiny font-extrabold my-3 text-yellow-500`}
              >
                <h1>No Reviews Yet&nbsp;-&nbsp;</h1>
                <h1 className="underline cursor-pointer">Leave a rating</h1>
              </div>
            )}

            <h1 className="dark:text-white text-black sm:text-base text-tiny line-clamp-3">
              {game?.description}
            </h1>
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

export default UserViewGame;
