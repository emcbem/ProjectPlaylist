import React, { FC, useContext, useState } from "react";
import Gauge from "./Gauge";
import NumberTicker from "@/components/ui/number-ticker";
import { UserGame } from "@/@types/usergame";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";
import AchievementsPage from "@/page_components/Achievements/Achievements";

interface TabProps {
  TabName: string;
  isActive: boolean;
  onClick: () => void;
}

const LibraryTab: React.FC<TabProps> = ({ TabName, isActive, onClick }) => {
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className={`inline-flex items-center justify-center border-b-2 rounded-t-lg sm:p-4 hover:text-black dark:hover:text-gray-300 group sm:text-sm text-xs ${
          isActive
            ? "text-black border-black dark:border-white dark:text-white"
            : "text-gray-500 border-transparent hover:border-black dark:hover:border-white"
        }`}
      >
        <svg
          className={`w-4 h-4 me-2 ${
            isActive ? "text-black dark:text-white" : "text-gray-500"
          } group-hover:text-black dark:text-gray-500 dark:group-hover:text-white sm:block hidden`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        {TabName}
      </a>
    </li>
  );
};

const LibraryTabs: FC<{ userGame?: UserGame }> = ({ userGame }) => {
  const [activeTab, setActiveTab] = useState<string>("Your Stats");

  const tabs = ["Your Stats", "Achievements", "Global Leaderboard"];
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const { data: userEarnedAchievement } =
    UserAchievementQueries.useGetUserAchievementByUserId(usr?.guid ?? "");

  return (
    <div className="w-full">
      <ul className="flex justify-between">
        {tabs.map((tab, key) => (
          <LibraryTab
            key={key}
            TabName={tab}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </ul>
      <div className="mt-4 w-full">
        {activeTab === "Your Stats" &&
        userEarnedAchievement != undefined &&
        userGame != undefined ? (
          <div className="shadow-xl w-fit rounded-xl flex flex-col items-start m-2 p-8">
            <div className="flex flex-col items-start">
              <h1 className="text-lg">Your Progress</h1>
              <div className="p-4 pl-0">
                <Gauge
                  totalAchievments={Number(
                    userGame?.platformGame.achievements.length
                  )}
                  earnedAchievements={Number(userEarnedAchievement?.length)}
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <h1 className="text-lg">Hours Played</h1>
              <div className="p-4">
                <NumberTicker
                  value={Number(userGame.timePlayed)}
                  className="text-5xl"
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {activeTab === "Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <AchievementsPage
              passedGameAchievements={userGame?.platformGame.achievements}
            />
          </div>
        )}
        {activeTab === "Global Leaderboard" && <div>Coming soon...</div>}
      </div>
    </div>
  );
};

export default LibraryTabs;
