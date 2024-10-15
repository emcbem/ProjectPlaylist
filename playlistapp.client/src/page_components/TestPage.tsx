import { AchievementQueries } from "@/hooks/AchievementQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { platformGameId } = useParams<{ platformGameId: string }>();

  const allAchievements = AchievementQueries.useGetAchievementByPlatformGameId(
    Number(platformGameId)
  ).data;

  const achievement = AchievementQueries.useGetAchievementById(45).data;
  const achievementByName = AchievementQueries.useGetAchievementByName(
    "End of the First Mother"
  ).data;

  console.log(achievementByName);

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          <p>{platformGameId}</p>
          {allAchievements ? (
            allAchievements.length > 0 ? (
              allAchievements.map((x) => <p key={x.id}>{x.name}</p>)
            ) : (
              <p>No achievements found.</p>
            )
          ) : (
            <p>Loading achievements...</p>
          )}
        </div>
        <div>
          <p>Achievement 45</p>
          {achievement ? (
            <div>
              <p>{`Name: ${achievement.name}`}</p>
              <p>{`Description: ${achievement.description}`}</p>
            </div>
          ) : (
            <p>Loading achievement 45...</p>
          )}
        </div>
        <div>
          <p>Achievement By Name: End of the First Mother</p>
          <div>
            {achievementByName ? (
              achievementByName.length > 0 ? (
                achievementByName.map((x) => <p key={x.id}>{x.name}</p>)
              ) : (
                <p>No achievements found.</p>
              )
            ) : (
              <p>Loading achievements...</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TestPage;
