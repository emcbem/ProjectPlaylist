import { OrderingMethods } from "@/@types/Enums/OrderingMethod";
import { GetGamesRequest } from "@/@types/Requests/GetRequests/getGamesRequest";
import { useEffect, useState } from "react";
import { HumanizeOrder } from "../logic/humanize-order";

function Dropdown({
  setSearchRequest,
}: {
  setSearchRequest: React.Dispatch<React.SetStateAction<GetGamesRequest>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [orderingMethod, setOrderingMethod] = useState<OrderingMethods>(
    OrderingMethods.HighestRating
  );

  useEffect(() => {
    setSearchRequest((x) => ({
      ...x,
      orderingMethod: orderingMethod,
    }));
  }, [orderingMethod]);

  const handleClick = (orderingMethod: OrderingMethods) => {
    setOrderingMethod(orderingMethod);
  };

  return (
    <div className="relative inline-block text-left h-[50px]">
      <div className="flex flex-row gap-3 h-full items-center">
        <div className=" flex flex-col items-center">
          <p className="text-center">Sort:</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center dark:text-white
           dark:bg-black outline outline-1 outline-white w-[213.69px]
            px-4 py-2 text-sm font-medium text-gray-700 bg-white border
             border-black rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none 
             focus:ring-2  focus:ring-purple-400 dark:focus:ring-pporange-500"
        >
          {HumanizeOrder(orderingMethod)}
          <svg
            className="w-5 h-5 ml-2 -mr-1 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 w-[213.683px] mt-2 origin-top-right  dark:bg-black dark:text-white bg-white border border-gray-300 rounded-md shadow-lg">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleClick(OrderingMethods.AZ)}
              className="block w-full px-4 py-2 text-sm  dark:hover:bg-neutral-800  hover:bg-gray-100 "
              role="menuitem"
            >
              A-Z
            </button>
            <button
              onClick={() => handleClick(OrderingMethods.ZA)}
              className="block w-full px-4 py-2 text-sm dark:hover:bg-neutral-800  hover:bg-gray-100 "
              role="menuitem"
            >
              Z-A
            </button>
            <button
              onClick={() => handleClick(OrderingMethods.HighestRating)}
              className="block w-full px-4 py-2 text-sm dark:hover:bg-neutral-800  hover:bg-gray-100 "
              role="menuitem"
            >
              Highest Rating
            </button>
            <button
              onClick={() => handleClick(OrderingMethods.ReleaseDate)}
              className="block w-full px-4 py-2 text-sm dark:hover:bg-neutral-800  hover:bg-gray-100 "
              role="menuitem"
            >
              Release Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
