import { Achievement } from "@/@types/achievement";
import { FC } from "react";

interface props {
  achievement: Achievement;
}

export const AchievementPictureDisplay: FC<props> = ({ achievement }) => {
  return (
    <div className="mx-5 flex flex-col justify-center items-center">
      <img
        src={achievement.imageURL}
        className="w-40 h-40 object-cover rounded-lg shadow-xl top-10"
        alt={`Achievement`}
      />
      <p className="dark:text-clay-950 text-slate-900">{achievement.name}</p>
    </div>
  );
};
