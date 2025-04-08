import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { Modal } from "@/components/ui/modal";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { useModalController } from "@/page_components/Settings/Hooks/useModalController";
import { GameQueries } from "@/queries/GameQueries";
import { GameReviewQueries } from "@/queries/GameReviewQueries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Slider from "@mui/material/Slider";
import React, { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface props {
  hideReview?: boolean;
  gameReviewId?: number;
  editVal?: number;
  editReview?: string;
}

const ReviewModal: FC<props> = ({
  hideReview,
  gameReviewId,
  editVal,
  editReview,
}) => {
  const [currentRatingVal, setVal] = useState<number>(editVal ? editVal : 0);
  const [reviewText, setReviewText] = useState<string>(
    editReview ? editReview : ""
  );
  const [review, setReview] = useState<AddGameReviewRequest>();
  const [updateReview, setUpdateReview] = useState<UpdateGameReviewRequest>();

  const { gameId } = useParams<{ gameId: string }>();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: game } = GameQueries.useGetGameById(Number(gameId));

  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  const { mutate: addGameReview } = GameReviewQueries.useAddGameReview(
    review!,
    Number(gameId)
  );

  const { mutate: updateGameReivew } = GameReviewQueries.useUpdateGameReview(
    updateReview!,
    Number(gameId)
  );

  const handleAddGameReview = () => {
    addGameReview();
  };

  const handleUpdateGameReview = () => {
    updateGameReivew();
  };

  const modalController = useModalController({
    closeOnSuccess: false,
    showBottomButtons: false,
    title: "Leave a review",
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (reviewText.length == 0 || reviewText == "") {
      toast.error("You can't leave a review without any text.");
      return;
    }

    if (currentRatingVal == 0) {
      toast.error("You can't leave a review with a rating of 0");
      return;
    }

    if (game && usr && !editReview && !editVal) {
      setReview({
        gameId: game?.id,
        userId: usr?.id,
        rating: currentRatingVal,
        text: reviewText,
      });

      setVal(0);
      setReviewText("");

      handleAddGameReview();
    }
    if (game && usr && gameReviewId && editReview && editVal) {
      setUpdateReview({
        gameReviewId: gameReviewId,
        rating: currentRatingVal,
        reviewText: reviewText,
      });

      handleUpdateGameReview();
    }

    modalController.setModalVisibility(false);
  };

  return (
    <>
      {editReview && editVal ? (
        <PencilSquareIcon
          className="h-5 text-clay-900 mx-3"
          role="button"
          onClick={() => modalController.setModalVisibility(true)}
        />
      ) : (
        <button
          onClick={() => modalController.setModalVisibility(true)}
          className={`rounded-md bg-clay-200 dark:bg-clay-600 py-2 px-4 border border-transparent text-center text-sm dark:text-white text-white transition-all shadow-md ml-2 ${
            hideReview == true ? `hidden` : ``
          }`}
          type="button"
        >
          Leave a review
        </button>
      )}

      <Modal {...modalController}>
        <div className="flex justify-center items-center">
          <div className="mx-5">
            <img
              src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
              className="w-40 h-64 object-cover rounded-lg shadow-xl sticky top-10"
              alt={`${game?.title} cover`}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5"
          >
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-1 text-sm text-stone-300">
                Rating {currentRatingVal}/10
              </label>
              <Slider
                aria-label="Rating"
                onChange={handleChange}
                value={currentRatingVal}
                valueLabelDisplay="auto"
                marks
                step={1}
                min={1}
                max={10}
                sx={{
                  width: 300,
                  color: "#b9baba",
                }}
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-stone-300 ">Review</label>
              <textarea
                className="resize-none w-full rounded-md bg-transparent placeholder:white text-white text-md border border-stone-400 px-3 py-2 focus:border-white focus:ring-0 font-sans "
                placeholder={reviewText ? reviewText : "Enter your thoughts..."}
                value={reviewText ? reviewText : ""}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="p-6 pb-0">
              <button
                className="w-full rounded-md bg-blue-200 py-2 px-4 text-sm text-gray-800"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReviewModal;
