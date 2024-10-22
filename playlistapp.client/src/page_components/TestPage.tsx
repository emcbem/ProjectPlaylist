import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { GameReviewQueries } from "@/hooks/GameReviewQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { gameId } = useParams<{ gameId: string }>();
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const newGameReview: AddGameReviewRequest = {
    gameId: Number(gameId),
    rating: 5,
    text: "this is a test review",
    userId: usr?.id ?? 0,
  };

  const updateGameReviewRequest: UpdateGameReviewRequest = {
    gameReviewId: 8,
    rating: 10,
    reviewText: "New Review Text",
  };

  const {
    mutate: addGameReview,
    data: newGameReviewId,
    isPending: isAddingGameReview,
    isError: isAddingGameReviewError,
    isSuccess: isAddingGameReviewSuccess,
  } = GameReviewQueries.useAddGameReview(newGameReview);

  const {
    mutate: updateGameReview,
    data: updatedGameReview,
    isPending: isUpdatingGameReview,
    isError: isUpdatingGameReviewError,
    isSuccess: isupdatingGameReviewSuccess,
  } = GameReviewQueries.useUpdateGameReview(updateGameReviewRequest);
  console.log("updatedGameReview: ", updatedGameReview)

  const handleAddGameReview = () => {
    addGameReview();
  };

  const handleUpdateGameReview = () => {
    updateGameReview();
  }

  const GameReviewById = GameReviewQueries.useGetGameReviewById(8).data;

  const AllGameReviewsForGame = GameReviewQueries.useGetAllGameReviewsByGame(
    Number(gameId)
  ).data;

  return (
    isAuthenticated &&
    user &&
    GameReviewById && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isAddingGameReview && <p>Adding review to game...</p>}
          {isAddingGameReviewSuccess && (
            <p>New Game Review Id: {newGameReviewId}</p>
          )}
          {isAddingGameReviewError && <p>Failed to add review to game.</p>}
          <button onClick={handleAddGameReview}>Add Review To Game</button>
        </div>
        <div>
          <p>You are viewing game review with id: {GameReviewById.id}</p>
          <p>You are viewing game: {GameReviewById.game.title}</p>
        </div>
        <div>
          {AllGameReviewsForGame?.map((x) => (
            <div key={x.id}>
              {x.id}: {x.text}
            </div>
          ))}
        </div>
        <div>
          {isUpdatingGameReview && <p>Updating game review...</p>}
          {isupdatingGameReviewSuccess && (
            <p>New Game Review Text: {updatedGameReview.text}</p>
          )}
          {isUpdatingGameReviewError && <p>Failed to update game review.</p>}
          <button onClick={handleUpdateGameReview}>Update Game Review</button>
        </div>
      </div>
    )
  );
};

export default TestPage;
