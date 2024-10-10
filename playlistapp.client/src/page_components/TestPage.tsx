import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { UserGameQueries } from "@/hooks/UserGameQueries";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userGameId } = useParams<{ userGameId: string }>();

  const {
    data: userGameFromGame,
    isLoading,
    error,
  } = UserGameQueries.useGetAllUserGamesByUserGameIdQuery(Number(userGameId));

  const { mutate: deleteUserGame, isPending: isDeleting } = UserGameQueries.useDeleteUserGame(Number(userGameId));

  const handleDelete = () => {
    deleteUserGame(); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user game: {error.message}</div>; 
  }

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {userGameFromGame ? (
            <div>
              {userGameFromGame.platformGame?.game?.title || "No title available"}
            </div>
          ) : (
            <div>No user game found.</div>
          )}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
            disabled={isDeleting} 
          >
            {isDeleting ? 'Deleting...' : `Delete ${userGameFromGame?.platformGame?.game?.title}`}
          </button>
        </div>
      </div>
    )
  );
};

export default TestPage;
