import { AchievementGroup } from "@/@types/WrapUps/AchievementGroup";
import React, { FC } from "react";
import WrapUpAchievementCard from "./WrapUpAchievementCard";

interface AchievementWrapUpProps {
  achievementGroups: AchievementGroup[];
}

const AchievementWrapUp: FC<AchievementWrapUpProps> = ({
  achievementGroups,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  return (
    <div className="mt-8 md:w-1/2 w:4/5">
      <div id="accordion-collapse" data-accordion="collapse">
        {achievementGroups.map((x) => {
          return (
            <div key={x.gameName}>
              <h2 id={`accordion-collapse-heading-${x.gameName}`}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
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
                className={expanded === `panel${x.gameName}` ? "" : "hidden"}
                aria-labelledby={`accordion-collapse-heading-${x.gameName}`}
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  {x.achievements.map((y, idx) => (
                    <WrapUpAchievementCard key={idx} achievement={y} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementWrapUp;
