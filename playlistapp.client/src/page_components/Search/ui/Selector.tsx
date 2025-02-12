import { ChevronRightIcon } from "@heroicons/react/24/solid";

export interface SelectorController<T> {
  title: string;
  items: T[];
  stringify_value_fn: (value: T) => string;
  selectedItems: T[];
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
  showItems: boolean;
  setShowItems: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Selector = <T,>(controller: SelectorController<T>) => {
  const handleClick = (value: T) => {
    if (controller.selectedItems.find((x) => value == x)) {
      controller.setSelectedItems((v) => v.filter((f) => f != value));
    } else {
      controller.setSelectedItems((v) => [...v, value]);
    }
  };

  return (
    <>
  <div className="flex flex-row items-center">
    <p className="text-xl">{controller.title}</p>
    <button
      className="md:ml-auto ml-3"
      onClick={() => controller.setShowItems((x) => !x)}
    >
      <div
        className={`${
          controller.showItems ? "rotate-90" : ""
        } transition-transform duration-300 ease-in-out w-[45px]`}
      >
        <ChevronRightIcon />
      </div>
    </button>
  </div>
  <div className="overflow-hidden" 
       style={{
         maxHeight: controller.showItems ? `${controller.items.length * 50}px` : "0",
         transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
         opacity: controller.showItems ? 1 : 0,
       }}
    >
    <div className="flex flex-wrap">
      {controller.items.map((value, index) => (
        <div
          key={index}
          className={`rounded-full truncate p-1 px-3 border-2 w-full border-[#111111] dark:border-[#ffffff] m-1 ${
            controller.selectedItems.find((x) => value == x)
              ? "bg-gray-300 hover:bg-gray-200"
              : "bg-transparent hover:bg-gray-200"
          }`}
          onClick={() => handleClick(value)}
        >
          <p className=" text-center">
            
          {controller.stringify_value_fn(value)}
          </p>
        </div>
      ))}
    </div>
  </div>
</>

  );
};
