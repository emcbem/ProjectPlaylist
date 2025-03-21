import { FC } from "react";

type ButtonProps = {
  message: string;
  query?: () => void;
};

const Button: FC<ButtonProps> = ({ message, query }) => {
  return (
    <div className="mt-8 md:text-xl text-md cursor-pointer w-full outline outline-1 dark:outline-white outline-hazypurple rounded-2xl dark:shadow-[0px_0px_15px_2px_rgba(255,255,255,0.7)] shadow-[0px_0px_15px_2px_rgba(96,43,83)]">
      <button onClick={query} className="w-full my-4">
        {message}
      </button>
    </div>
  );
};

export default Button;
