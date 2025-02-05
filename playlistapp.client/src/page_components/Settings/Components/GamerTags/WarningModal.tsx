import React from "react";
import { useRef } from "react";

const WarningModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative mx-auto w-full max-w-[48rem] h-96 rounded-lg overflow-hidden shadow-sm bg-clay-200 dark:bg-clay-400 transition-transform duration-300 flex justify-center items-center ${
            isModalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 mx-5 items-center"
          >
            <h1 className="text-2xl text-red-500">Warning</h1>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-lg text-white">
                By linking your PSN account, it will import your PSN library's
                data which includes library and playtime. By doing so, there
                might be unintended side effects from your library. Want to
                proceed?
              </label>
            </div>
            <div className="p-6 pb-0 px-0 flex flex-row w-full">
              <button
                className="w-full rounded-md bg-red-500 py-2 px-4 text-sm m-2 text-white"
                type="submit"
              >
                No thank you.
              </button>
              <button
                className="w-full rounded-md bg-green-500 py-2 px-4 text-sm m-2 text-white"
                type="submit"
              >
                Yes!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
