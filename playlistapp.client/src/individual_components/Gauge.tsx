import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { FC } from "react";

const Gauge: FC<{ earnedAchievements: number; totalAchievments: number }> = ({
  earnedAchievements,
  totalAchievments,
}) => {
  return (
    <div className="relative">
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={(earnedAchievements / totalAchievments) * 100}
        gaugePrimaryColor="rgb(21 128 61)"
        gaugeSecondaryColor="rgb(115 117 117)"
        className="w-24 h-24"
      />
    </div>
  );
};

export default Gauge;
