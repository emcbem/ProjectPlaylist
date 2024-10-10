import { EpicIcon } from "@/assets/ViewGameSVGs/epicLogo";
import { PS5Icon } from "@/assets/ViewGameSVGs/psLogo";
import { SwitchIcon } from "@/assets/ViewGameSVGs/swichLogo";
import { XboxIcon } from "@/assets/ViewGameSVGs/xboxLogo";
import { Link } from "react-router-dom";

interface props {
  GameId: number | undefined;
}

const PlatformIconList: React.FC<props> = ({ GameId }) => {
  return (
    <div className="flex flex-row lg:mx-28 mx-12 md:my-8 my-4">
      <Link
        to={`/achievements/${GameId}`}
        className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mr-4 lg:mr-3 md:mr-2 mr-1"
      >
        <PS5Icon height={35} width={35} darkColor="black" color="white" />
      </Link>
      <Link
        to={`/achievements/${GameId}`}
        className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1"
      >
        <EpicIcon height={35} width={35} darkColor="black" color="white" />
      </Link>
      <Link
        to={`/achievements/${GameId}`}
        className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1"
      >
        <SwitchIcon height={35} width={35} darkColor="black" color="white" />
      </Link>
      <Link
        to={`/achievements/${GameId}`}
        className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1"
      >
        <XboxIcon height={35} width={35} darkColor="black" color="white" />
      </Link>
    </div>
  );
};

export default PlatformIconList;
