import React, { useState } from "react";
import AchievementsPage from "@/page_components/Achievements";
import Review from "./Review";
import ReviewModal from "./ReviewModal";
import { useParams } from "react-router-dom";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";

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
        className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-black dark:hover:text-gray-300 group ${
          isActive
            ? "text-black border-black dark:border-white dark:text-white"
            : "text-gray-500 border-transparent hover:border-black dark:hover:border-white"
        }`}
      >
        <svg
          className={`w-4 h-4 me-2 ${
            isActive ? "text-black dark:text-white" : "text-gray-500"
          } group-hover:text-black dark:text-gray-500 dark:group-hover:text-white`}
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

const Tabs = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: AllGameReviewsForGame } =
    GameReviewQueries.useGetAllGameReviewsByGame(parseInt(gameId ?? "1"));

  const [activeTab, setActiveTab] = useState<string>("Reviews");

  const tabs = ["Reviews", "Your Stats", "Achievements", "Global Leaderboard"];

  return (
    <div className="w-full">
      {/*This line below*/}
      <ul className="flex lgmd:justify-normal justify-center space-x-2">
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
        {/* REVIEWS HERE!!! */}
        {activeTab === "Reviews" && (
          <>
            <div className="text-left text-2xl dark:text-white flex flex-col">
              {AllGameReviewsForGame && AllGameReviewsForGame?.length > 0 ? (
                AllGameReviewsForGame?.map((review, index) => (
                  <Review review={review} key={index} />
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
            <ReviewModal />
          </>
        )}

        {activeTab === "Your Stats" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <span>Hours Played: 200</span>
            <span>Date Added: 10/1/2024</span>
          </div>
        )}
        {activeTab === "Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <AchievementsPage />
          </div>
        )}
        {activeTab === "Global Leaderboard" && <div>Global Leaderboards</div>}
      </div>
    </div>
  );
};

export default Tabs;
