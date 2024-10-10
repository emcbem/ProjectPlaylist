import React, { useState } from "react";
import AchievementList from "./AchievementList";
import AchievementsPage from "@/page_components/Achievements";
import Review from "./Review";

interface TabProps {
  TabName: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ TabName, isActive, onClick }) => {
  return (
    <li className="me-2">
      <a
        href="#"
        onClick={onClick}
        className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 group ${
          isActive
            ? "text-gray-300 border-gray-300 dark:border-gray-300"
            : "text-gray-500 border-transparent hover:border-gray-300"
        }`}
      >
        <svg
          className={`w-4 h-4 me-2 ${
            isActive ? "text-blue-600" : "text-gray-400"
          } group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`}
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

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tab 1");

  const tabs = ["Reviews", "Your Stats", "Your Achievements", "Global Leaderboard"];

  return (
    <div className="w-full">
      <ul className="flex space-x-2">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            TabName={tab}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </ul>

      <div className="mt-4 w-full">
      {activeTab === "Reviews" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <Review UserName={"Stinky123"} Comment={"Goodness I LOVE THIS GAME!!!"} Score={10} />
            <Review UserName={"BigPHAT"} Comment={"Yeah I really recommend this"} Score={7} />
            <Review UserName={"TheEpicCritical"} Comment={"Pshh, overrated if you ask me LOL"} Score={5} />
            <Review UserName={"TheDepartmentOfSwagerculture"} Comment={"Game crashes everytime...."} Score={1} />
          </div>
        )}
        {activeTab === "Your Stats" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <span>Hours Played: 200</span>
            <span>Date Added: 10/1/2024</span>
          </div>
        )}
        {activeTab === "Your Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col w-full">
            <span className="underline">Earned Achievements</span>
            <AchievementsPage showAddButton={false} />
            <span className="underline">Not Earned Achievements</span>
            <AchievementsPage showAddButton={true} />
          </div>
        )}
        {activeTab === "Global Leaderboard" && <div>Global Leaderboards</div>}
      </div>
    </div>
  );
};

export default Tabs;
