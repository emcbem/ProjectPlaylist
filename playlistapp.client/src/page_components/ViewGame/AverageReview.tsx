import { Game } from "@/@types/game";
import { GameReviewQueries } from "@/queries/GameReviewQueries";
import { useState, useEffect } from "react";

export const AverageReview = ({ game }: { game: Game }) => {
  const [avgReview, setAvgReview] = useState<number | null>();
  const { data: AllGameReviewsForGame } =
    GameReviewQueries.useGetAllGameReviewsByGame(game.id ?? 1);

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

  if (!avgReview) {
    return (
      <div
        className={`flex flex-row sm:text-base text-tiny font-extrabold my-3 text-yellow-500`}
      >
        <h1>No Reviews Yet</h1>
      </div>
    );
  }

  return (
    <div
      className={`sm:text-base text-tiny font-extrabold my-3 flex flex-row ${
        avgReview <= 10.0 && avgReview >= 8.0
          ? `text-green-500`
          : avgReview < 8.0 && avgReview >= 6.0
          ? `text-yellow-500`
          : avgReview < 6.0 && avgReview >= 3.0
          ? `text-orange-500`
          : avgReview < 3.0 && avgReview >= 0.0
          ? `text-red-700`
          : ``
      }`}
    >
      <h1>{Math.round(avgReview * 10) / 10}/10 average rating</h1>
    </div>
  );
};
