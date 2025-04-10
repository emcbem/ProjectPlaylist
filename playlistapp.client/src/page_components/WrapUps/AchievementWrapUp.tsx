import { AchievementGroup } from "@/@types/WrapUps/AchievementGroup";
import React, { FC } from "react";
import WrapUpAchievementCard from "./WrapUpAchievementCard";

interface AchievementWrapUpProps {
  achievementGroups: AchievementGroup[];
  userName: string;
}

const AchievementWrapUp: FC<AchievementWrapUpProps> = ({
  achievementGroups,
  userName,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const numAchievements = achievementGroups.reduce(
    (acc, group) => acc + group.achievements.length,
    0
  );

  return (
    <>
      <h3 className="text-center mt-24 text-3xl mb-3">
        {userName} earned {numAchievements} Achievements
      </h3>
      <div className="w-full md:w-3/4 lg:w-1/2 mx-3">
        <div id="accordion-collapse" data-accordion="collapse">
          {achievementGroups.map((x, index) => {
            const isFirst = index === 0;
            const isLast = index === achievementGroups.length - 1;
            return (
              <div key={x.gameName}>
                <h2 id={`accordion-collapse-heading-${x.gameName}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-rightborder border-b-0 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 border-2 border-gray-200 
                    ${isFirst ? "rounded-t-xl " : ""}
                    ${
                      isLast && expanded !== `panel${x.gameName}`
                        ? "border-b-2 rounded-b-xl "
                        : ""
                    }
                    ${
                      expanded === `panel${x.gameName}`
                        ? "rounded-b-none rounded-none"
                        : ""
                    }
                        `}
                    data-accordion-target={`#accordion-collapse-body-${x.gameName}`}
                    aria-expanded={expanded === `panel${x.gameName}`}
                    aria-controls={`accordion-collapse-body-${x.gameName}`}
                    onClick={() =>
                      setExpanded(
                        expanded === `panel${x.gameName}`
                          ? false
                          : `panel${x.gameName}`
                      )
                    }
                  >
                    <span>{x.gameName}</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id={`accordion-collapse-body-${x.gameName}`}
                  className={`${
                    expanded === `panel${x.gameName}` ? "" : "hidden"
                  } ${
                    isLast ? "rounded-b-xl border-b dark:border-gray-600" : ""
                  }`}
                  aria-labelledby={`accordion-collapse-heading-${x.gameName}`}
                >
                  <div
                    className={`sm:p-5 border border-b-0 border-gray-200 dark:border-gray-600 ${
                      isLast ? "rounded-b-xl border-b dark:border-gray-600" : ""
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {x.achievements.map((y, idx) => (
                        <WrapUpAchievementCard key={idx} achievement={y} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AchievementWrapUp;
