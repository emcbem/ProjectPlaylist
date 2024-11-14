import { Goal } from "@/@types/goal";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GoalQueries } from "@/hooks/GoalQueries";
import formatDate from "@/lib/date";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

const GoalCard = () => {
  const { isAuthenticated } = useAuth0();
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: userGoals } = GoalQueries.useGetGoalsByUser(usr?.guid ?? "");
  const [goal, setGoal] = useState<Goal>();

  const calculateDaysRemaining = (dueDate: Date | string) => {
    const dueDateObj =
      typeof dueDate === "string" ? new Date(dueDate) : dueDate;
    if (isNaN(dueDateObj.getTime())) return null;
    const today = new Date();
    const timeDifference = dueDateObj.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  const daysRemaining = goal?.dateToAchieve
    ? calculateDaysRemaining(goal.dateToAchieve)
    : null;

  useEffect(() => {
    const currentGoal = userGoals?.find((x) => x.isCurrent === true);
    setGoal(currentGoal);
  }, [userGoals]);

  console.log("days left: ", daysRemaining);

  return (
    isAuthenticated &&
    goal && (
      <div className="w-full relative max-w-full flex bg-gray-100 dark:bg-clay-400 shadow-md rounded-lg my-4 p-6">
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex flex-wrap text-xl text-gray-800 dark:text-white">
              <div className="w-1/3">
                {daysRemaining === 0 && (
                  <p className="text-nowrap font-bold">
                    Looks like you ran out of time!
                  </p>
                )}
                {daysRemaining! > 0 && (
                  <p className="text-nowrap font-bold">
                    Due in {daysRemaining} day{daysRemaining != 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            {!goal.dateCompleted && (
              <div className="flex flex-wrap text-lg text-gray-800 dark:text-white">
                <p className="text-nowrap">
                  Accomplish by {formatDate(goal.dateToAchieve)}
                </p>
              </div>
            )}
            {goal.dateCompleted && (
              <div className="lg:w-2/12 md:w-3/12 w-4/12 mr-2">
                <p className="font-bold">Completed On:</p>{" "}
                {formatDate(goal.dateCompleted)}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 bg-white dark:bg-clay-100 rounded-lg p-6">
            <img
              src={goal.achievement.imageURL}
              alt={goal.achievement.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="lg:text-4xl sm:text-3xl text-xl font-bold text-gray-900 dark:text-white">
                {goal.achievement.name}
              </h3>
              <p className="text-gray-700 text-lg dark:text-slate-50">
                {goal.achievement.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap mt-4 mb-2 text-lg text-gray-800 dark:text-white">
            <div className="w-1/3">
              <p className="text-nowrap">
                You set this goal on {formatDate(goal.dateAdded)}
              </p>
            </div>
          </div>

          <div className="w-full relative max-w-full flex justify-end items-end space-x-2">
            <div
              className={`px-4 py-2 text-base font-semibold text-center text-black`}
            >
              Edit
            </div>

            <div
              className={`px-4 py-2 text-base font-semibold rounded-sm text-center ${
                goal.isCompleted
                  ? "bg-green-600 text-white dark:text-black dark:bg-green-600"
                  : daysRemaining! < 1
                  ? "bg-red-700 text-white"
                  : "bg-yellow-200 text-black"
              }`}
            >
              {goal.isCompleted
                ? "Completed"
                : daysRemaining! < 1
                ? "Failed"
                : "In Progress"}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalCard;
