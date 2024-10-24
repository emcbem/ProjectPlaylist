import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { ReviewLikeQueries } from "@/hooks/ReviewLikeQueries";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { gameReviewId } = useParams<{ gameReviewId: string }>();
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const addReviewLikeRequest: AddReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    isLike: true,
    userId: usr?.guid ?? "",
  };

  const {
    mutate: AddReviewLike,
    data: newReviewLike,
    isPending: isAdding,
    isError: isAddingError,
    isSuccess: isAddingSuccess,
  } = ReviewLikeQueries.useAddReviewLike(addReviewLikeRequest);

  const {
    data: allReviewLikes,
    isPending: isGetting,
    isError: isGettingError,
    isSuccess: isGettingSuccess,
  } = ReviewLikeQueries.useGetAllReviewLikesByUser(usr?.guid ?? "");

  const handleAddReviewLike = () => {
    AddReviewLike();
  };

  return (
    isAuthenticated &&
    user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {isAdding && <p>Adding like to Review...</p>}
          {isAddingSuccess && <p>Is liked: {String(newReviewLike)}</p>}
          {isAddingError && <p>Failed to add like to Review.</p>}
          <button onClick={handleAddReviewLike}>Add Like to Review</button>
        </div>
        <div>
          {isGetting && <p>Getting all review likes for user {usr?.username}...</p>}
          {isGettingSuccess &&             <div>
              {allReviewLikes?.map((x) => (
                <div key={x.id}>
                  {x.id}: {x.game.title}, Rating: {x.rating}, Text: {x.text}
                </div>
              ))}
            </div>}
          {isGettingError && <p>Failed to add like to Review.</p>}
        </div>
      </div>
    )
  );
};

export default TestPage;
