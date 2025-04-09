import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useRef } from "react";

export interface ModalController {
  title: string | undefined;
  children: ReactNode;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisibility: boolean;
  onSuccess?: () => void;
  onDismiss?: () => void;
  clickingOffModalClosesModal: boolean;
  hideTopButtons: boolean;
  hideBottomButtons: boolean;
  setHideTopButtons: React.Dispatch<React.SetStateAction<boolean>>;
  setHideBottomButtons: React.Dispatch<React.SetStateAction<boolean>>;
  setClickingOffModalClosesModel: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnSuccess: boolean;
}

export const Modal = ({
  title,
  children,
  setModalVisibility,
  modalVisibility,
  onSuccess,
  onDismiss,
  clickingOffModalClosesModal, // Default value
  hideTopButtons,
  hideBottomButtons,
  closeOnSuccess,
}: ModalController) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  function HandleDismiss() {
    onDismiss?.();
    setModalVisibility(false);
  }

  function HandleSuccess() {
    onSuccess?.();
    if (closeOnSuccess) {
      setModalVisibility(false);
    }
  }
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (clickingOffModalClosesModal) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        HandleDismiss();
      }
    }
  };

  return (
    <>
      <div
        ref={backgroundRef}
        className={`fixed inset-0 z-[10000] grid min-h-screen min-w-screen place-items-center dark:bg-black bg-slate-200 dark:bg-opacity-60 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          modalVisibility
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
      >
        <div
          className={`relative mx-auto max-w-[48rem] w-full h-auto rounded-lg overflow-hidden shadow-sm bg-white dark:bg-clay-400 transition-transform duration-300 flex flex-col p-8 ${
            modalVisibility ? "scale-100" : "scale-95"
          }`}
          ref={modalRef}
        >
          <div className="flex flex-row" id="ModalTitleRow">
            {title && <h1 className="text-2xl font-bold dark:text-white">{title}</h1>}
            {!hideTopButtons && (
              <button className="ml-auto w-5 h-5 dark:text-white " onClick={HandleDismiss}>
                <XMarkIcon />
              </button>
            )}
          </div>
          <div className="">
            {children}
          </div>
          <div className="flex flex-row" id="ModalBottomRow">
            {!hideBottomButtons && (
              <div className="flex flex-row ml-auto gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={HandleSuccess}
                >
                  <CheckIcon className="w-4 h-4" />
                  Accept
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={HandleDismiss}
                >
                  <XMarkIcon className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
