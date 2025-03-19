import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import BlackButton from "@/components/ui/BlackButton";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GameQueries } from "@/queries/GameQueries";
import { GameReviewQueries } from "@/queries/GameReviewQueries";
import Slider from "@mui/material/Slider";
import React, { FC } from "react";
import { useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState<number>(editVal ? editVal : 0);
  const [reviewText, setReviewText] = useState<string>(
    editReview ? editReview : ""
  );
  const [review, setReview] = useState<AddGameReviewRequest>();
  const [updateReview, setUpdateReview] = useState<UpdateGameReviewRequest>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { gameId } = useParams<{ gameId: string }>();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: game } = GameQueries.useGetGameById(Number(gameId));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (game && usr && !editReview && !editVal) {
      setReview({
        gameId: game?.id,
        userId: usr?.id,
        rating: val,
        text: reviewText,
      });

      setVal(0);
      setReviewText("");

      handleAddGameReview();
    }
    if (game && usr && gameReviewId && editReview && editVal) {
      setUpdateReview({
        gameReviewId: gameReviewId,
        rating: val,
        reviewText: reviewText,
      });

      handleUpdateGameReview();
    }

    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      {editReview && editVal ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square mx-2 cursor-pointer text-clay-900"
          viewBox="0 0 16 16"
          onClick={openModal}
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      ) : (
        usr && (
          <BlackButton
            className={!hideReview ? "hidden" : "mb-9"}
            onClick={openModal}
          >
            Leave a Review
          </BlackButton>
        )
      )}

      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[10000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            // className={`relative mx-auto w-full sm:max-w-[48rem] sm:h-96 max-w-[16rem] h-64 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="mx-5 ">
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
              <label className="block mb-2 text-sm text-white">Rating</label>
              <Slider
                aria-label="Rating"
                onChange={handleChange}
                value={val}
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
              <label className="block mb-2 text-sm text-white ">Review</label>
              <textarea
                className="resize-y w-full rounded-md bg-transparent placeholder:white text-white text-sm border border-white px-3 py-5  focus:border-white focus:ring-0"
                placeholder={reviewText ? reviewText : "Enter your thoughts..."}
                value={reviewText ? reviewText : ""}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="p-6 pb-0">
              <button
                className="w-full rounded-md bg-clay-950 py-2 px-4 text-sm text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
