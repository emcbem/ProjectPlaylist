import Avatar from "../assets/user.svg";
import AvatarInverted from "../assets/userInverted.svg";

interface props {
  UserName: string;
  Comment: string;
  Score: number;
}

const Review: React.FC<props> = ({ UserName, Comment, Score }) => {
  return (
    <>
      <li className="py-3 sm:pb-4 ">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full dark:hidden block"
              src={Avatar}
              alt="Neil image"
            />
            <img
              className="w-12 h-12 rounded-full dark:block hidden"
              src={AvatarInverted}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="md:text-2xl sm:text-xl text-lg font-medium text-gray-900  dark:text-gray-400">
              {UserName}
            </p>
            <p className="md:text-lg sm:text-base text-sm text-gray-500 dark:text-white">
              {Comment}
            </p>
          </div>
          <div
            className={`inline-flex items-center md:text-lg sm:text-base text-sm font-semibold ${
              Score <= 10 && Score >= 8
                ? `text-yellow-500`
                : Score <= 7 && Score >= 6
                ? `text-green-700`
                : Score <= 5 && Score >= 3
                ? `text-orange-400`
                : Score <= 2 && Score >= 0
                ? `text-red-700`
                : ``
            }`}
          >
            {Score}/10
          </div>
        </div>
      </li>
    </>
  );
};

export default Review;
