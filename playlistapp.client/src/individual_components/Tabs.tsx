import React, { useContext, useEffect, useState } from "react";
import Review from "./Review";
import ReviewModal from "./ReviewModal";

import { useParams, Link } from "react-router-dom";
import { GameReviewQueries } from "@/queries/GameReviewQueries";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { GameReview } from "@/@types/gameReview";
import AchievementsPage from "@/page_components/Achievements/Achievements";
import LoginLink from "@/components/ui/LoginLink";

interface TabProps {
  TabName: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ TabName, isActive, onClick }) => {
  return (
    <li>
      <Link
        to="#"
        onClick={onClick}
        className={`inline-flex items-center justify-center border-b-2 rounded-t-lg sm:p-4 hover:text-black dark:hover:text-gray-300 group sm:text-base text-sm ${
          isActive
            ? "text-black border-black dark:border-white dark:text-white"
            : "text-gray-500 border-transparent hover:border-black dark:hover:border-white"
        }`}
      >
        {TabName == "Reviews" && (
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
        )}
        {TabName == "Achievements" && (
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 me-2 ${
              isActive ? "text-black dark:text-white" : "text-gray-500"
            } group-hover:text-black dark:text-gray-500 dark:group-hover:text-white sm:block hidden`}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 0H12V2H16V4C16 6.45641 14.2286 8.49909 11.8936 8.92038C11.5537 10.3637 10.432 11.5054 9 11.874V14H12V16H4V14H7V11.874C5.56796 11.5054 4.44628 10.3637 4.1064 8.92038C1.77136 8.49909 0 6.45641 0 4V2H4V0ZM12 6.82929V4H14C14 5.30622 13.1652 6.41746 12 6.82929ZM4 4H2C2 5.30622 2.83481 6.41746 4 6.82929V4Z"
            ></path>{" "}
          </svg>
        )}

        {TabName}
      </Link>
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

  const tabs = ["Reviews", "Achievements"];
  let hideReviewButton = false;


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
        <></>;
      } else if (filter === "Top Rated") {
        setSortedReviews(
          reviewsCopy.sort(
            (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes)
          )
        );
      } else if (filter === "Recent") {
        setSortedReviews(
          reviewsCopy.sort(
            (a, b) =>
              new Date(b.publishDate).getTime() -
              new Date(a.publishDate).getTime()
          )
        );
      }
    }
  }, [AllGameReviewsForGame, filter, usr]);
  return (
    <div className="w-full">
      <ul className="flex">
        {tabs.map((tab, key) => (
          <div className={tab == "Achievements" ? "ml-12" : ""} key={key}>
            <Tab
              key={key}
              TabName={tab}
              isActive={tab === activeTab}
              onClick={() => setActiveTab(tab)}
            />
          </div>
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
                  <MenuList
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Recommended")}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Recommended
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Recent")}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Recent
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem
                      className="text-clay-950"
                      onClick={() => setFilter("Top Rated")}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Top Rated
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>

              {!loading ? (
                AllGameReviewsForGame &&
                AllGameReviewsForGame.length > 0 &&
                sortedReviews[0] != undefined ? (
                  sortedReviews.map((review) => {
                    if (usr && usr.guid === review.user.guid) {
                      hideReviewButton = true;
                    }
                    return (
                      <Review
                        review={review}
                        currentUserGuid={usr?.guid}
                        key={review.id}
                      />
                    );
                  })
                ) : usr ? (
                  <p>No reviews yet, leave one!</p>
                ) : (
                  <p>
                    No reviews yet. <br />
                    <LoginLink>Log in</LoginLink> to leave a review.
                  </p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
            {usr &&
              !AllGameReviewsForGame?.some((x) => x.user.guid === usr.guid) && (
                <ReviewModal hideReview={hideReviewButton} />
              )}
          </>
        )}
        {activeTab === "Achievements" && (
          <div className="text-left text-2xl dark:text-white flex flex-col">
            <AchievementsPage isViewingOwnProfile={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
