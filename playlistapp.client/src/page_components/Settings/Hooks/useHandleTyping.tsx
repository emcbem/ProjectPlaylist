import React from "react";

export const useHandleTyping = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  const newValue = e.target.value;
  setValue(newValue);
};
