import { Game, GameContextInterface } from "@/@types/game";
import { GameContext } from "@/contexts/GameContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AchievementList from "../individual_components/AchievementList";

const AchievementsPage: React.FC = () => {
  const { games } = React.useContext(GameContext) as GameContextInterface;
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setgame] = useState<Game>();

  useEffect(() => {
    setgame(games.find((x) => x.id === Number(gameId)));
  }, [games]);

  return (
    <div className="flex-grow w-full dark:text-white text-black">
      <div className="mt-10 pt-10 font-bold mx-auto max-w-screen-xl pb-5 underline md:text-5xl sm:text-4xl text-3xl">
        {`Achievements for ${game?.title}`}
      </div>
      <div className="mx-auto max-w-screen-xl">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <AchievementList
            Title={"Participation Ribbon"}
            Description={"Create a contestant"}
            Rareity={"31.61% (145.00)"}
          />
          <AchievementList
            Title={"Initial Deposit"}
            Description={"Insert a cash box into a cashout station"}
            Rareity={"71.17% (64.00)"}
          />
          <AchievementList
            Title={"Med Student"}
            Description={"Revive a teammate"}
            Rareity={"90.61% (50.00)"}
          />
          <AchievementList
            Title={"Returning Contestant"}
            Description={"Play 3 rounds of Quick Cash"}
            Rareity={"70.61% (65.00)"}
          />
          <AchievementList
            Title={"Green Light"}
            Description={"Play 10 rounds with a Light Build"}
            Rareity={"31.17% (147.00)"}
          />
        </ul>
      </div>
    </div>
  );
};

export default AchievementsPage;
