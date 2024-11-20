import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { FC } from "react";

const Gauge: FC<{ earnedAchievements: number; totalAchievments: number }> = ({
  earnedAchievements,
  totalAchievments,
}) => {
  return (
    <div className="relative size-40">
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={(earnedAchievements / totalAchievments) * 100}
        gaugePrimaryColor="rgb(21 128 61)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
    </div>
  );
};

export default Gauge;
