import { Link } from "react-router-dom";

const ViewAllGoalsButton = () => {
  return (
    <Link to={"/viewallgoals"}>
      <div
        className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start py-1 px-2  justify-center space-x-1 mt-2"
        role="button"
      >
        View All Goals
      </div>
    </Link>
  );
};

export default ViewAllGoalsButton;
