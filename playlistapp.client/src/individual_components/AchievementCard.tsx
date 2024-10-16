import { Plus } from "@/assets/trophies/plus";

interface props {
  Title: string;
  Description: string;
  showAddButton: boolean;
  imageUrl: string;
}

const AchievementCard: React.FC<props> = ({
  Title,
  Description,
  showAddButton,
  imageUrl,
}) => {
  // console.log("Title", Title);
  // console.log("Description", Description);
  // console.log("imageUrl", imageUrl);
  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src={imageUrl}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-lg font-medium text-gray-900  dark:text-white">
              {Title}
            </p>
            <p className="md:text-lg sm:text-base text-sm text-gray-500 dark:text-gray-400">
              {Description}
            </p>
          </div>
          <div className="inline-flex items-center md:text-lg sm:text-base text-sm font-semibold text-gray-900 dark:text-white">
            <div className="relative inline-block md:ml-4 ml-0 cursor-pointer">
              {showAddButton && <Plus height={25} width={25} />}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default AchievementCard;
