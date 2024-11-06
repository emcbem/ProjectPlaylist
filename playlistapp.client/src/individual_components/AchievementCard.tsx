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
  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
              src={imageUrl}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-tiny font-medium text-gray-900  dark:text-white">
              {Title}
            </p>
            <p className="md:text-lg sm:text-base text-tiny text-gray-500 dark:text-gray-400">
              {Description}
            </p>
          </div>
          <div className="inline-flex items-center md:text-lg sm:text-base text-sm font-semibold text-gray-900 dark:text-white">
            <div className="relative inline-block md:ml-4 ml-0 cursor-pointer">
              {showAddButton && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className={`w-[15px] h-[15px] md:m-1 ml-1 mb-1 fill-current`} // Use fill-current to allow Tailwind to apply fill colors
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="text-black dark:text-white" // Use text color classes for the path
                    d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default AchievementCard;
