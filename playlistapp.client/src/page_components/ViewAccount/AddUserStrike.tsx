import { UserAccountQueries } from "@/queries/UserAccountQueries";
import React, { useRef, useState } from "react";

interface AddUserStrikeProp {
  userGuid: string;
  userName: string;
}

const AddUserStrike: React.FC<AddUserStrikeProp> = ({ userGuid, userName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutateAsync: addUserStrikeAsync } =
    UserAccountQueries.useAddUserStrike();

  const StrikeUser = async () => {
    addUserStrikeAsync(userGuid);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await StrikeUser();
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal} className="" type="button">
        Strike
      </button>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[10000] grid h-screen w-screen place-items-center dark:bg-black bg-white dark:bg-opacity-60 bg-opacity-60  backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-auto rounded-lg overflow-hidden shadow-sm bg-white dark:bg-clay-400 transition-transform duration-300 flex flex-col p-8 animation-fill-mode: forwards;${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5"
          >
            <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
              Strike User {userName}
            </h2>
            <p className=" mb-6">
              Users may receive a strike for inappropriate behavior. Are you
              sure you want to issue a strike to {userName}?
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="submit"
              >
                Strike User
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={closeModal}
                type="reset"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserStrike;
