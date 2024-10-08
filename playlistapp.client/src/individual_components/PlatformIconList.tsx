import { EpicIcon } from "@/assets/SmallPlatforms/epicLogo";
import { PS5Icon } from "@/assets/SmallPlatforms/psLogo";
import { SwitchIcon } from "@/assets/SmallPlatforms/swichLogo";
import { XboxIcon } from "@/assets/SmallPlatforms/xboxLogo";

const PlatformIconList = () => {
  return (
    <div className="flex flex-row lg:mx-28 mx-12 md:my-8 my-4">
      <div className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mr-4 lg:mr-3 md:mr-2 mr-1">
        <PS5Icon height={35} width={35} darkColor="black" color="white" />
      </div>
      <div className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1">
        <EpicIcon height={35} width={35} darkColor="black" color="white" />
      </div>
      <div className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1">
        <SwitchIcon height={35} width={35} darkColor="black" color="white" />
      </div>
      <div className="xl:p-4 md:p-3 sm:p-2 p-1 bg-[#252A2C] dark:bg-[#D9D9D9] rounded-lg flex justify-center items-center w-fit h-fit xl:mx-4 lg:mx-3 md:mx-2 mx-1">
        <XboxIcon height={35} width={35} darkColor="black" color="white" />
      </div>
    </div>
  );
};

export default PlatformIconList;
