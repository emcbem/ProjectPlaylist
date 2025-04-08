import { TopGame } from "@/@types/WrapUps/TopGame";
import { FC } from "react";
import GameCover from "../ViewGame/GameCover";

interface TopGameProps {
  TopGameData?: TopGame;
}

const TopGameWrapUp: FC<TopGameProps> = ({ TopGameData }) => {
  if (!TopGameData) {
    return <p>No data</p>;
  }
  return (
    <div className="flex flex-col-reverse md:flex-row md:items-start items-center mt-24 text-center md:text-left">
      <GameCover coverUrl={TopGameData.coverUrl} title={TopGameData.title} />
      <div className="w-full md:w-1/2 md:mx-7 mb-6">
        <h2 className="text-3xl">Your top game was {TopGameData.title}</h2>
        <p className="text-xl">{TopGameData.allTimeHours} hours played.</p>
        <p className="text-xl">
          <span>{TopGameData.dateFromCompletion.toString()}</span> date from
          completion.
        </p>
        <p className="text-xl">
          Started playing <span>{TopGameData.firstTimePlayed.toString()}</span>
        </p>
      </div>
    </div>
  );
};

export default TopGameWrapUp;
