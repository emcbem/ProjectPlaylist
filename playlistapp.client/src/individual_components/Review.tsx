import { GameReview } from "@/@types/gameReview.js";
import ReviewLike from "./ReviewLike.tsx";
import ReviewModal from "./ReviewModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import formatDate from "@/lib/date.ts";

interface props {
  review: GameReview;
  currentUserGuid: string;
}

const Review: React.FC<props> = ({ review, currentUserGuid }) => {
  console.log(review.id, new Date(review.publishDate).getUTCDate());
  return (
    <li className="py-3 w-full sm:pb-4 border-y-2 border-clay-600 rounded-md my-2">
      <div className="flex space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img
            className="sm:w-12 sm:h-12 w-8 h-8 rounded-full block border-2 border-clay-700 bg-clay-600"
            src={review.user.profileURL!}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <p className="sm:text-sm text-tiny font-medium text-clay-950  dark:text-clay-900">
                {review.user.username}&nbsp;-&nbsp;
              </p>
              <p className="sm:text-sm text-tiny font-medium text-clay-950  dark:text-clay-900">
                {formatDate(review.publishDate)}
              </p>
            </div>

            <div
              className={`flex justify-end items-baseline md:text-lg sm:text-base text-tiny font-semibold mx-2 ${
                review.rating <= 10 && review.rating >= 8
                  ? `text-yellow-500`
                  : review.rating <= 7 && review.rating >= 6
                  ? `text-green-500`
                  : review.rating <= 5 && review.rating >= 3
                  ? `text-orange-400`
                  : review.rating <= 2 && review.rating >= 0
                  ? `text-red-700`
                  : ``
              }`}
            >
              {currentUserGuid == review.user.guid ? (
                <div className="sm:flex hidden">
                  <DeleteModal gameReviewId={review.id} />
                  <ReviewModal
                    gameReviewId={review.id}
                    editReview={review.text}
                    editVal={review.rating}
                  />
                </div>
              ) : (
                <> </>
              )}
              {review.rating}/10
            </div>
          </div>
          <p className="sm:text-lg text-tiny text-black dark:text-white line-clamp-3">
            {review.text}
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center mt-5"></div>

      <ReviewLike
        review={review}
        showCrud={currentUserGuid == review.user.guid}
      />
    </li>
  );
};

export default Review;
