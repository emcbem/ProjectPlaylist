import { AchievementGroup } from "@/@types/WrapUps/AchievementGroup";
import React, { FC } from "react";
import AchievementCard from "../Achievements/Components/AchievementCard";
import { AchievementQueries } from "@/queries/AchievementQueries";

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
                    <AchievementCard
                      key={idx}
                      achievement={y}
                      showAddButton={false}
                    />
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

// import { AchievementGroup } from "@/@types/WrapUps/AchievementGroup";
// import React, { FC } from "react";
// import AchievementCard from "../Achievements/Components/AchievementCard";

// interface AchievementWrapUpProps {
//   achievementGroups: AchievementGroup[];
// }

// const AchievementWrapUp: FC<AchievementWrapUpProps> = ({
//   achievementGroups,
// }) => {
//   const [expanded, setExpanded] = React.useState<string | false>("panel1");

//   return (
//     <div className="mt-8 md:w-1/2 w:4/5">
//       <div id="accordion-collapse" data-accordion="collapse">
//         {achievementGroups.map((x, key) => {
//           return (
//             <>
//               <h2 id="accordion-collapse-heading-1" key={key}>
//                 <button
//                   type="button"
//                   className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
//                   data-accordion-target="#accordion-collapse-body-1"
//                   aria-expanded={`${expanded === `panel${x.gameName}`}`}
//                   aria-controls="accordion-collapse-body-1"
//                   onClick={() => setExpanded(`panel1${x.gameName}`)}
//                 >
//                   <span>{x.gameName}</span>
//                   <svg
//                     data-accordion-icon
//                     className="w-3 h-3 rotate-180 shrink-0"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M9 5 5 1 1 5"
//                     />
//                   </svg>
//                 </button>
//               </h2>
//               <div
//                 id="accordion-collapse-body-1"
//                 className={expanded === `panel1${x.gameName}` ? "" : "hidden"}
//                 aria-labelledby="accordion-collapse-heading-1"
//               >
//                 <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//                   {x.achievements.map((y, key) => {
//                     <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                       <div className="flex-shrink-0">
//                         <img
//                           className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
//                           src={achievement.Achievement.imageURL}
//                           alt="Achievement Logo"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="md:text-2xl sm:text-xl text-tiny font-medium text-gray-900  dark:text-white">
//                           {achievement.Achievement.name}{" "}
//                           {achievement?.Earned?.isSelfSubmitted && (
//                             <span className="text-sm font-sans font-light text-gray-400">
//                               Self Submitted
//                             </span>
//                           )}
//                           <br />
//                           {achievement?.Earned?.dateAchieved && (
//                             <span className="text-sm font-sans font-light text-gray-400">
//                               {formatDate(achievement?.Earned?.dateAchieved)}
//                             </span>
//                           )}
//                         </p>
//                         <p className="md:text-lg sm:text-base text-tiny text-gray-500 dark:text-gray-400">
//                           {usr?.guid && !showAddButton && (
//                             <p>{achievement.Achievement?.description}</p>
//                           )}
//                         </p>
//                       </div>
//                       <div className="inline-flex items-center md:text-lg sm:text-base text-sm font-semibold text-gray-900 dark:text-white">
//                         <div className="relative inline-block md:ml-4 ml-0 cursor-pointer">
//                           {usr?.guid && showAddButton && (
//                             <AchievementModalParent
//                               achievement={achievement.Achievement}
//                               earned={achievement.Earned!}
//                               userGuid={usr.guid}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>;
//                   })}
//                 </div>
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AchievementWrapUp;
