import GoalCard from "./ViewSingleGoal";

const ViewAllGoals = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white flex justify-center">
      <div className="w-full" style={{ maxWidth: "1200px" }}>
        <div className="">
          <GoalCard></GoalCard>
        </div>
      </div>
    </div>
  );
};

export default ViewAllGoals;
