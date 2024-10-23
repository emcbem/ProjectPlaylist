import { ThumbsUp } from "../assets/ThumbsUp.tsx";
import { ThumbsDown } from "@/assets/ThumbsDown.tsx";
import { GameReview } from "@/@types/gameReview.js";

interface props {
  review: GameReview;
}

const Review: React.FC<props> = ({ review }) => {
  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full block"
              src={review.user.profileURL!}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-clay-950  dark:text-clay-900">
              {review.user.username}
            </p>
            <p className="md:text-lg sm:text-base text-sm text-black dark:text-white line-clamp-3">
              {review.text}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center mt-5">
          <ThumbsUp />
          <ThumbsDown />
          <div
            className={`flex justify-end items-center md:text-lg sm:text-base text-sm font-semibold mx-2 ${
              review.rating <= 10 && review.rating >= 8
                ? `text-yellow-500`
                : review.rating <= 7 && review.rating >= 6
                ? `text-green-700`
                : review.rating <= 5 && review.rating >= 3
                ? `text-orange-400`
                : review.rating <= 2 && review.rating >= 0
                ? `text-red-700`
                : ``
            }`}
          >
            {review.rating}/10
          </div>
        </div>
      </li>
    </>
  );
};

export default Review;
