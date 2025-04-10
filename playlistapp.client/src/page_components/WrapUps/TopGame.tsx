import { TopGame } from "@/@types/WrapUps/TopGame";
import { FC } from "react";
import GameCover from "../ViewGame/GameCover";
import format_date from "@/lib/format_date";

interface TopGameProps {
  TopGameData: TopGame;
  userName: string;
}

const TopGameWrapUp: FC<TopGameProps> = ({ TopGameData, userName }) => {
  if (!TopGameData) {
    return <p>No data</p>;
  }
  return (
    <div className="flex flex-col-reverse md:flex-row md:items-start items-center mt-24 text-center md:text-left">
      <GameCover coverUrl={TopGameData.coverUrl} title={TopGameData.title} />
      <div className="w-full md:w-1/2 md:mx-7 mb-6">
        <h2 className="text-3xl mb-7">
          {userName} top game was{" "}
          <span className="font-bold">{TopGameData.title}</span>
        </h2>
        <p className="text-xl mb-3">
          <span className="font-bold">
            {Math.floor(TopGameData.allTimeHours / 60)}
          </span>{" "}
          hours played in total.
        </p>
        <p className="text-xl mb-3">
          Started playing{" "}
          <span className="font-bold">
            {format_date(TopGameData.firstTimePlayed)}
          </span>
        </p>
        <p className="text-xl mb-3">
          <span className="font-bold">{TopGameData.totalAchievements}</span>{" "}
          achievements earned in this time frame.
        </p>
      </div>
    </div>
  );
};

export default TopGameWrapUp;
