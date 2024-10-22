import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import Slider from "@mui/material/Slider";
import { FC, useRef, useState } from "react";

interface Props {
  gameId: number;
  userId: number;
}

const ReviewModal: FC<Props> = ({ gameId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [review, setReview] = useState<AddGameReviewRequest>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { mutate: addGameReview } = GameReviewQueries.useAddGameReview(review!);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setReview({
      gameId: gameId,
      userId: userId,
      rating: val,
      text: reviewText,
    });

    console.log("review", review);

    addGameReview();

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
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
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
          className={`relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
            <h3 className="text-2xl">Leave a review</h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Rating
              </label>
              <Slider
                aria-label="Rating"
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                sx={{
                  width: 300,
                  color: "#1e293b",
                }}
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Review
              </label>
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
                placeholder="Your Review"
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="p-6 pt-0">
              <button
                className="w-full rounded-md bg-slate-800 py-2 px-4 text-sm text-white"
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
