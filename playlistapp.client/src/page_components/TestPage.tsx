import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import { UserGame, UserGameContextInterface } from "@/@types/usergame";
import { updateUserGameRequest } from "@/@types/Requests/updateUserGameRequest";
import { UserGameContext } from "@/contexts/UserGameContext";
import React, { useEffect, useState } from "react";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userGameId } = useParams<{ userGameId: string }>();
  const [userGame, setUserGame] = useState<UserGame>();

  const {
    data: userGameFromGame,
    isLoading,
    error,
  } = UserGameQueries.useGetAllUserGamesByUserGameIdQuery(Number(userGameId));

  const { userGamesFromUser } = React.useContext(
    UserGameContext
  ) as UserGameContextInterface;

  const { mutate: deleteUserGame, isPending: isDeleting } =
    UserGameQueries.useDeleteUserGame();

  const { mutate: updateUserGame, isPending: isUpdating } =
    UserGameQueries.useUpdateUserGame();

  const handleDelete = (id: number) => {
    deleteUserGame(id);
  };

  const handleUpdateUserGame = async (userGame: UserGame) => {
    console.log("Handling an update");
    if (userGame) {
      const newUpdateUserGameRequest: updateUserGameRequest = {
        dateAdded: new Date(),
        userGameId: userGame.userGameId,
        timePlayed: userGame.timePlayed + 1,
      };
      updateUserGame(newUpdateUserGameRequest);
    }
  };

  useEffect(() => {
    console.log("User email: ", user?.email);
    console.log("UserGameId: ", userGameId);
    console.log("UserGamesFromUser: ", userGamesFromUser);
  
    const matchingUserGame = userGamesFromUser.find(
      (x) =>
        x.userGameId === Number(userGameId)
    );
  
    if (matchingUserGame) {
      console.log("Found matching user game: ", matchingUserGame);
    } else {
      console.log("No matching user game found.");
    }
  
    setUserGame(matchingUserGame);
  }, [user?.email, userGameId, userGamesFromUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user game: {error.message}</div>;
  }

  return (
    isAuthenticated &&
    user &&
    userGame && (
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
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(Number(userGameId))}
            disabled={isDeleting}
          >
            {isDeleting
              ? "Deleting..."
              : `Delete ${userGameFromGame?.platformGame?.game?.title}`}
          </button>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleUpdateUserGame(userGame)}
            disabled={isUpdating}
          >
            {isUpdating
              ? "Updating..."
              : `Update ${userGameFromGame?.platformGame?.game?.title}`}
          </button>
        </div>
      </div>
    )
  );
};

export default TestPage;
