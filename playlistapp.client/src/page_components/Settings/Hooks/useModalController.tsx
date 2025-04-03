import { ModalController } from "@/components/ui/modal";
import { useState } from "react";

export const useModalController = ({
  title = undefined,
  clickOffCloses = true,
  showTopButtons = true,
  showBottomButtons = true,
  onSuccess,
  onDismiss,
  closeOnSuccess = true
}: {
  title?: string | undefined;
  clickOffCloses?: boolean;
  showTopButtons?: boolean;
  showBottomButtons?: boolean;
  onSuccess?: () => void;
  onDismiss?: () => void;
  closeOnSuccess?: boolean
} = {}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [clickingOffModalClosesModal, setClickingOffModalClosesModel] =
    useState(clickOffCloses);
  const [hideTopButtons, setHideTopButtons] = useState(!showTopButtons);
  const [hideBottomButtons, setHideBottomButtons] = useState(
    !showBottomButtons
  );

  return {
    title,
    modalVisibility,
    setModalVisibility,
    clickingOffModalClosesModal,
    setClickingOffModalClosesModel,
    hideTopButtons,
    setHideTopButtons,
    hideBottomButtons,
    setHideBottomButtons,
    onSuccess,
    onDismiss,
    closeOnSuccess
  } as ModalController;
};
