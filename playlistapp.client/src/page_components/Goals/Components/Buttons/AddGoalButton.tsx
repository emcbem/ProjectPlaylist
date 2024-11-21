import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddGoalButton = () => {
  return (
    <div
      className="cursor-pointer absolute top-0 right-0 flex flex-row bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg py-1 px-2 space-x-2 items-center lg:text-xl "
      role="button"
    >
      <span className="leading-none">Add Goal</span>
      <PlusCircleIcon className="hidden sm:block sm:w-6 sm:h-6" fill="white" />
    </div>
  );
};

export default AddGoalButton;
