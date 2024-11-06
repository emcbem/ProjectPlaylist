import React, { useContext, useEffect, useState } from "react";
import AchievementsPage from "@/page_components/Achievements";
import Review from "./Review";
import ReviewModal from "./ReviewModal";
import { useParams } from "react-router-dom";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { GameReview } from "@/@types/gameReview";

interface TabProps {
  TabName: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ TabName, isActive, onClick }) => {
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

const Tabs = () => {
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;
  const { gameId } = useParams<{ gameId: string }>();

  const { data: AllGameReviewsForGame, isLoading: loading } =
    GameReviewQueries.useGetAllGameReviewsByGame(parseInt(gameId ?? "1"));

  const [activeTab, setActiveTab] = useState<string>("Reviews");
  const [filter, setFilter] = useState<string>("Recommended");
  const [sortedReviews, setSortedReviews] = useState<GameReview[]>([]);

  const tabs = ["Reviews", "Your Stats", "Achievements", "Global Leaderboard"];

  useEffect(() => {
    if (AllGameReviewsForGame) {
      const reviewsCopy = AllGameReviewsForGame.slice();

      const userReviewIndex = reviewsCopy.findIndex(
        (item) => item.user.guid === usr?.guid
      );
      const [userReview] = reviewsCopy.splice(userReviewIndex, 1);
      reviewsCopy.unshift(userReview);
      setSortedReviews(reviewsCopy);

      if (filter === "Recommended" && userReviewIndex > -1) {
      } else if (filter === "Most Liked") {
        setSortedReviews(
          reviewsCopy.sort(
            (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes)
          )
        );
      } else if (filter === "Recent") {
        setSortedReviews(
          reviewsCopy.sort(
            (a, b) =>
              new Date(a.publishDate).getTime() -
              new Date(b.publishDate).getTime()
          )
        );
      }
    }
  }, [AllGameReviewsForGame, filter, usr]);
  return (
    <div className="w-full">
      <ul className="flex justify-between">
        {tabs.map((tab, key) => (
          <Tab
            key={key}
            TabName={tab}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </ul>
      <div className="mt-4 w-full">
        {activeTab === "Reviews" && (
          <>
            <div className="text-left text-2xl dark:text-white flex flex-col">
              <div className="flex flex-row">
                <p className="sm:text-sm text-tiny font-medium text-clay-950 dark:text-clay-600 p-2">
                  Sort by:
                </p>
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <button className="sm:text-sm text-tiny font-medium text-clay-950 dark:text-clay-900 p-2 hover:bg-clay-900 hover:text-white rounded-md underline transition-colors duration-300 ease-in-out border-none">
                      {filter}
                    </button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Recommended")}
                    >
                      Recommended
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Recent")}
                    >
                      Recent
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Most Liked")}
                    >
                      Top Rated
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>

              {usr && !loading ? (
                AllGameReviewsForGame && AllGameReviewsForGame.length > 0 ? (
                  sortedReviews.map((review, key) => (
                    <Review
                      review={review}
                      currentUserGuid={usr?.guid}
                      key={key}
                    />
                  ))
                ) : (
                  <p>No reviews yet, leave one!</p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <ReviewModal />
          </>
        )}
        {activeTab === "Your Stats" && <div>Coming soon...</div>}
        {activeTab === "Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <AchievementsPage />
          </div>
        )}
        {activeTab === "Global Leaderboard" && <div>Coming soon...</div>}
      </div>
    </div>
  );
};

export default Tabs;
