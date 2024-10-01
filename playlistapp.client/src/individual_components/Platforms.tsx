import { PS5Icon } from "../assets/HomePlatforms/psLogo";
import { XboxIcon } from "../assets/HomePlatforms/xboxLogo";
import { SwitchIcon } from "../assets/HomePlatforms/swichLogo";
import { SteamIcon } from "../assets/HomePlatforms/steamLogo";
import { EpicIcon } from "../assets/HomePlatforms/epicLogo";
import { TwitchIcon } from "../assets/HomePlatforms/twitchLogo";

const ExpandingColumns = () => {
  return (
    <div className="flex justify-center my-20 ">
      <div className="">
        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#00439C] transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center">
          <PS5Icon />
        </div>

        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#107C10] transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center">
          <XboxIcon />
        </div>
      </div>

      <div className="">
        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#E60012] transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center ">
          <SwitchIcon />
        </div>

        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#2a475e] transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center">
          <SteamIcon />
        </div>
      </div>

      <div className="">
        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#000000] hover:border-gray-200 border-2 transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center">
          <EpicIcon />
        </div>

        <div className="group 2xl:m-20 xl:m-16 lg:m-12 md:m-8 sm:m-4 m-4 bg-gray-200 hover:bg-[#6441A4] transition-all duration-300 2xl:w-64 xl:w-60 lg:w-52 md:w-44 sm:w-36 w-24 2xl:h-64 xl:h-60 lg:h-52 md:h-44 sm:h-36 h-24 rounded-lg flex justify-center items-center">
          <TwitchIcon />
        </div>
      </div>
    </div>
  );
};

export default ExpandingColumns;
