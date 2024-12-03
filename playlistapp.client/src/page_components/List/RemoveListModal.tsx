import { List } from "@/@types/list";
import TrashIconGray from "@/assets/Icons/Trash";
import { ListQueries } from "@/queries/ListQueries";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RemoveListProps {
  list: List | undefined;
}

const RemoveListModal: React.FC<RemoveListProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutateAsync } = ListQueries.useDeleteListQuery();
  const navigate = useNavigate();

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const deleteList = async () => {
    if (list) {
      await mutateAsync(list.id);
    }
    navigate("/account");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="" type="button">
        <TrashIconGray />
      </button>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center dark:bg-black bg-white dark:bg-opacity-60 bg-opacity-60  backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-auto rounded-lg overflow-hidden shadow-sm bg-white dark:bg-clay-400 transition-transform duration-300 flex flex-col p-8 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveListModal;
