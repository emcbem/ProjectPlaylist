import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GameQueries } from "@/hooks/GameQueries";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import Slider from "@mui/material/Slider";
import React from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [review, setReview] = useState<AddGameReviewRequest>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { gameId } = useParams<{ gameId: string }>();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: game } = GameQueries.useGetGameByIdQuery(Number(gameId));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  // MUTATION HERE!!
  const { mutate: addGameReview } = GameReviewQueries.useAddGameReview(
    review!,
    Number(gameId)
  );

  const handleAddGameReview = () => {
    addGameReview();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (game && usr)
      setReview({
        gameId: game?.id,
        userId: usr?.id,
        rating: val,
        text: reviewText,
      });

    handleAddGameReview();

    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-md bg-clay-200 dark:bg-clay-600 py-2 px-4 border border-transparent text-center text-sm dark:text-white text-white transition-all shadow-md ml-2"
        // className="rounded-md bg-clay-200 dark:bg-clay-600 sm:py-2 px-1 sm:px-4 sm:text-base w-28 h-8 border border-transparent text-center text-sm dark:text-white text-white transition-all shadow-md ml-2"
        type="button"
      >
        Leave a review
      </button>

      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
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
                valueLabelDisplay="auto"
                step={1}
                marks
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
                placeholder="Your Review"
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
