import React, { FC, useState } from "react";
import AchievementsPage from "@/page_components/Achievements";
import Gauge from "./Gauge";
import { Achievement } from "@/@types/achievement";

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
        {/* SVG Icon */}
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

const LibraryTabs: FC<{ passedGameAchievements?: Achievement[] }> = ({
  passedGameAchievements,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Your Stats");

  const tabs = ["Your Stats", "Achievements", "Global Leaderboard"];

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
        {activeTab === "Your Stats" && (
          <div className="flex flex-row w-full">
            {" "}
            <div className="bg-[#f1f3f4] dark:bg-clay-100 shadow-xl w-fit p-10 rounded-xl flex flex-col items-center justify-center m-2">
              <Gauge />
            </div>
            <div className="bg-[#f1f3f4] dark:bg-clay-100 shadow-xl w-full p-10 rounded-xl flex flex-col items-center justify-center m-2">
              <h1>Hours Played: 250</h1>
            </div>
          </div>
        )}
        {activeTab === "Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <AchievementsPage passedGameAchievements={passedGameAchievements} />
          </div>
        )}
        {activeTab === "Global Leaderboard" && <div>Coming soon...</div>}
      </div>
    </div>
  );
};

export default LibraryTabs;
