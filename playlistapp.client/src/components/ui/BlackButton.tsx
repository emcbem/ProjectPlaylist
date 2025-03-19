import { FC } from "react";

interface BlackButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const BlackButton: FC<BlackButtonProps> = ({ text, className, onClick }) => {
  return (
    <div
      className={`cursor-pointer rounded-md bg-clay-200 dark:bg-clay-600 py-2 px-4 border border-transparent text-center text-sm dark:text-white text-white transition-all shadow-md ml-2 ${className}`}
      role="button"
      onClick={onClick ? () => onClick() : undefined} // gives me error
    >
      {text}
    </div>
  );
};

export default BlackButton;
