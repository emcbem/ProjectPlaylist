import { Plus } from "@/assets/SmallPlatforms/plus";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

interface props {
    area: string
}

const AddButton: React.FC<props> = ({area}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative flex flex-row items-center bg-[#252A2C] dark:bg-[#D9D9D9] dark:text-black text-white rounded-lg text-start w-1/4 mr-4 h-32 justify-between p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="text-3xl font-extrabold">Add To</div>
        <div className="text-5xl font-extrabold">{area}</div>
      </div>
      <div className="relative inline-block ml-4">
        <Plus height={50} width={50} darkColor="black" color="white" />
      </div>
      {isHovered && (
        <BorderBeam
          borderWidth={5}
          duration={12}
          delay={9}
          className="rounded-lg"
        />
      )}
    </div>
  );
};

export default AddButton;
