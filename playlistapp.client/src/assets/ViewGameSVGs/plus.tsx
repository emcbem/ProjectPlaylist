interface props {
  height: number;
  width: number;
}

export const Plus: React.FC<props> = ({ height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={`2xl:w-[${width}px] 2xl:h-[${height}px] xl:w-[${
      width - 15
    }px] xl:h-[${height - 15}px] lg:w-[${width - 20}px] lg:h-[${
      height - 20
    }px] w-[${width - 25}px] h-[${
      height - 25
    }px]  md:m-1 ml-1 mb-1 fill-current`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      className="text-white dark:text-black"
      d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
    />
  </svg>
);
