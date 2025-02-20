import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

export const SuccessPage = ({
  completeMethod,
}: {
  completeMethod: () => void;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-3xl mb-4 text-green-600">It is done!</h2>
      <p className="text-gray-700 dark:text-white">
        IGDB sync has been completed successfully.
      </p>
      <Button message="Close" query={completeMethod} />
    </div>
  );
};
