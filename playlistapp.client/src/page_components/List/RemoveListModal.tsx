import { List } from "@/@types/list";
import TrashIconGray from "@/assets/Icons/Trash";
import { Modal } from "@/components/ui/modal";
import { ListQueries } from "@/queries/ListQueries";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useModalController } from "../Settings/Hooks/useModalController";

interface RemoveListProps {
  list: List | undefined;
}

const RemoveListModal: React.FC<RemoveListProps> = ({ list }) => {
  const { mutateAsync } = ListQueries.useDeleteListQuery();
  const navigate = useNavigate();

  const deleteList = async () => {
    if (list) {
      await mutateAsync(list.id);
    }
    navigate("/account");
  };

  const modalController = useModalController({
    showBottomButtons: false,
    showTopButtons: false,
  });

  return (
    <>
      <button
        onClick={() => modalController.setModalVisibility(true)}
        className=""
        type="button"
      >
        <TrashIconGray />
      </button>
      <Modal {...modalController}>
        <h2 className="text-3xl mb-4">
          Are you sure you want to remove this {list?.name}?
        </h2>
        <p className=" mb-6 text-red-600">
          Warning: Your list {list?.name} and it's associated games will be
          deleted forever.
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={deleteList}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => modalController.setModalVisibility(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default RemoveListModal;
