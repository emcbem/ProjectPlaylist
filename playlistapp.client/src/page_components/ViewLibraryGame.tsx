import { useParams } from "react-router-dom";
import Tabs from "@/individual_components/Tabs";
import AddButton from "@/individual_components/AddButton";
import { GameQueries } from "@/hooks/GameQueries";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import { useEffect, useState } from "react";
import formatDate from "@/lib/date";

const ViewLibraryGame = () => {
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
            <p className="text-clay-950 dark:text-clay-900">
              {game?.companies[0].name} -&nbsp;Released&nbsp;
              {game?.publishDate
                ? formatDate(new Date(game.publishDate))
                : "No publish date"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLibraryGame;