import { Modal } from "@/components/ui/modal";
import { useModalController } from "@/page_components/Settings/Hooks/useModalController";
import { GameReviewQueries } from "@/queries/GameReviewQueries";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface props {
  gameReviewId?: number;
}

const DeleteModal: FC<props> = ({ gameReviewId }) => {
  const { gameId } = useParams<{ gameId: string }>();

  const modalController = useModalController({
    showBottomButtons: false,
    showTopButtons: false,
  });

  const { mutate: updateGameReivew } = GameReviewQueries.useDeleteGameReview(
    Number(gameReviewId),
    Number(gameId)
  );

  const handleDeleteGameReview = () => {
    updateGameReivew();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleDeleteGameReview();

    modalController.setModalVisibility(false);
  };

  return (
    <>
      <button
        onClick={() => modalController.setModalVisibility(true)}
        className=""
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3 text-clay-900"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
        </svg>
      </button>
      <Modal {...modalController}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 mx-5">
          <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
            Are you sure you want to delete this review?
          </h2>
          <p className=" mb-6 text-red-600">
            Warning: Your list review will be deleted forever
          </p>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              type="submit"
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => modalController.setModalVisibility(false)}
              type="reset"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DeleteModal;
