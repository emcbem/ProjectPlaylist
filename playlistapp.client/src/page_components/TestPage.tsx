import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { UserGameQueries } from "@/hooks/UserGameQueries";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { gameId } = useParams();

  const {
    data: userGameFromGame,
    isLoading,
    error,
  } = UserGameQueries.useGetAllUserGamesByUserGameIdQuery(Number(gameId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user game</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {userGameFromGame ? (
            <div>
              {userGameFromGame.platformGame?.game?.title ||
                "No title available"}
            </div>
          ) : (
            <div>No user game found.</div>
          )}
        </div>
      </div>
    )
  );
};

export default TestPage;
