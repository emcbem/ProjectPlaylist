import { PencilSquareIcon } from "@heroicons/react/24/solid";

const ViewAllGoals = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
      <div className="w-full" style={{ maxWidth: "1200px" }}>
        <div className="relative">
          <p className="text-3xl top-0 left-0 p-2">Current Goal</p>
          <PencilSquareIcon
            className="h-10 absolute top-0 right-0 dark:text-white"
            role="button"
          />
          <div>
            <p className="p-2">Achievement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllGoals;
