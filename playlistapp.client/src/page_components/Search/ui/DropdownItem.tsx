import { XMarkIcon } from "@heroicons/react/24/solid";

export const DropdownItem = ({value, onClick}: {value: string, onClick: () => void}) => {
  return (
    <div
      className={`rounded-full truncate min-h-[35px] p-1 px-3 border border-[#111111] dark:border-white m-1 `}
    >
      <div className="flex flex-row ">
        <p className="w-4/5 truncate ">
          <span className="transition-opacity">
            {value}
          </span>
        </p>
        <div
          onClick={onClick}
          role="button"
          className="h-[25px] w-[25px] ml-auto hover:bg-gray-300 rounded-full"
        >
          <XMarkIcon />
        </div>
      </div>
    </div>
  );
};
