import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { GetReviewLikeRequest } from "@/@types/Requests/GetRequests/getReviewLikeRequest";
import { UpdateReviewLikeRequest } from "@/@types/Requests/UpdateRequests/updateReviewLikeRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";

import { ReviewLikeQueries } from "@/hooks/ReviewLikeQueries";
import { FC, useContext, useEffect, useState } from "react";

const ReviewLike: FC<{
  reviewLikeCount: number;
  reviewDislikeCount: number;
  gameReviewId: number;
  gameId: number;
}> = ({ reviewLikeCount, reviewDislikeCount, gameReviewId, gameId }) => {
  const { usr, userGuid } = useContext(
    UserAccountContext
  ) as UserAccountContextInterface;
  const [val, setVal] = useState<boolean>(false);

  const addReviewLikeRequest: AddReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    isLike: val,
    userId: userGuid ?? "",
  };

  const updateReviewLikeRequest: UpdateReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    isLike: val,
    userId: userGuid ?? "",
  };

  const getReviewLikeRequest: GetReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    userId: userGuid ?? "",
  };

  const { mutate: AddReviewLike } = ReviewLikeQueries.useAddReviewLike(
    addReviewLikeRequest,
    gameReviewId,
    gameId
  );
  const { mutate: UpdateReviewLike } = ReviewLikeQueries.useUpdateReviewLike(
    updateReviewLikeRequest,
    gameReviewId,
    gameId
  );
  const { mutate: RemoveReviewLike } = ReviewLikeQueries.useRemoveReviewLike(
    updateReviewLikeRequest,
    gameReviewId,
    gameId
  );
  const { data: reviewLike, refetch } = ReviewLikeQueries.useGetReviewLike(
    getReviewLikeRequest,
    gameReviewId
  );

  useEffect(() => {
    if (usr) {
      refetch();
    }
  }, [usr, refetch]);

  const handleAddReviewLike = (passedVal: boolean) => {
    setVal(passedVal);
    AddReviewLike();
  };

  const handleUpdateReviewLike = (passedVal: boolean) => {
    setVal(passedVal);
    UpdateReviewLike();
  };

  const handleRemoveReviewLike = () => {
    RemoveReviewLike();
  };

  return (
    <div className="flex justify-end items-center mt-5">
      <div
        onClick={() => {
          usr && reviewLike?.isLike == true
            ? handleRemoveReviewLike()
            : reviewLike?.isLike == false
            ? handleUpdateReviewLike(true)
            : handleAddReviewLike(true);
        }}
      >
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`sm:w-5 sm:h-5 w-4 h-4 mx-2 transition-transform duration-300 cursor-pointer ${
              usr && reviewLike?.isLike == true
                ? " fill-green-500"
                : "fill-black dark:fill-white"
            }`}
            viewBox="0 0 16 14"
          >
            <path d="M7 0L5 5V14H14L16 8V5H10V2C10 0.895431 9.10457 0 8 0H7Z"></path>
            <path d="M3 5H0V14H3V5Z"></path>
          </svg>
          <p className="sm:text-sm text-tiny font-medium text-clay-950  dark:text-clay-900">
            {reviewLikeCount}
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          usr && reviewLike?.isLike == false
            ? handleRemoveReviewLike()
            : reviewLike?.isLike == true
            ? handleUpdateReviewLike(false)
            : handleAddReviewLike(false);
        }}
      >
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`sm:w-5 sm:h-5 w-4 h-4 mx-2 transition-transform duration-300 cursor-pointer transform -scale-x-100 ${
              usr && reviewLike?.isLike == false
                ? " fill-red-700"
                : "fill-black dark:fill-white"
            }`}
            viewBox="0 2 16 14"
          >
            <path d="M7 16L5 11V2H14L16 8V11H10V14C10 15.1046 9.10457 16 8 16H7Z"></path>
            <path d="M3 11H0V2H3V11Z"></path>
          </svg>
          <p className="sm:text-sm text-tiny font-medium text-clay-950  dark:text-clay-900">
            {reviewDislikeCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewLike;
