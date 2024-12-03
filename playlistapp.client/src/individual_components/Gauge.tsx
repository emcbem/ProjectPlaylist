import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { FC } from "react";

const Gauge: FC<{ earnedAchievements: number; totalAchievments: number }> = ({
  earnedAchievements,
  totalAchievments,
}) => {
  return (
    <div className="relative md:pl-4 pl-2">
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={(earnedAchievements / totalAchievments) * 100}
        gaugePrimaryColor="rgb(21 128 61)"
        gaugeSecondaryColor="rgb(115 117 117)"
        className="md:w-32 md:h-32 w-28 h-28"
      />
    </div>
  );
};

export default Gauge;
