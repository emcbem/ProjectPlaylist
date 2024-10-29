import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { RemoveReviewLikeRequest } from "@/@types/Requests/DeleteRequests/removeReviewLikeRequest";
import { GetReviewLikeRequest } from "@/@types/Requests/GetRequests/getReviewLikeRequest";
import { UpdateReviewLikeRequest } from "@/@types/Requests/UpdateRequests/updateReviewLikeRequest";
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

  const removeReviewLikeRequest: RemoveReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    userId: usr?.guid ?? "",
  };

  const updateReviewLikeRequest: UpdateReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
    isLike: false,
    userId: usr?.guid ?? "",
  };

  const getReviewLikeRequest: GetReviewLikeRequest = {
    gameReviewId: Number(gameReviewId),
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

  const {
    mutate: RemoveReviewLike,
    data: removedReviewLike,
    isPending: isDeleting,
    isError: isDeletingError,
    isSuccess: isDeletingSuccess,
  } = ReviewLikeQueries.useRemoveReviewLike(removeReviewLikeRequest);

  const {
    mutate: UpdateReviewLike,
    data: updatedReviewLike,
    isPending: isUpdating,
    isError: isUpdatingError,
    isSuccess: isUpdatingSuccess,
  } = ReviewLikeQueries.useUpdateReviewLike(updateReviewLikeRequest);

  const {
    data: reviewLike,
    isError: isFetchingError,
    isPending: isFetching,
    isSuccess: isFetchingSuccess,
  } = ReviewLikeQueries.useGetReviewLike(getReviewLikeRequest);

  const handleAddReviewLike = () => {
    AddReviewLike();
  };

  const handleDeleteReviewLike = () => {
    RemoveReviewLike();
  };

  const handleUpdateReviewLike = () => {
    UpdateReviewLike();
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
          {isFetching && <p>Getting review like...</p>}
          {isFetchingSuccess && <p>Review like Id: {reviewLike?.id}</p>}
          {isFetchingError && <p>Failed to get review like.</p>}
        </div>
        <div>
          {isGetting && (
            <p>Getting all review likes for user {usr?.username}...</p>
          )}
          {isGettingSuccess && (
            <div>
              {allReviewLikes?.map((x) => (
                <div key={x.id}>
                  {x.id}: {x.game.title}, Rating: {x.rating}, Text: {x.text}
                </div>
              ))}
            </div>
          )}
          {isGettingError && <p>Failed to add like to Review.</p>}
        </div>
        <div>
          {isDeleting && <p>Removing like from Review...</p>}
          {isDeletingSuccess && <p>Is removed: {String(removedReviewLike)}</p>}
          {isDeletingError && <p>Failed to remove like from Review.</p>}
          <button onClick={handleDeleteReviewLike}>
            Remove Like from Review
          </button>
        </div>
        <div>
          {isUpdating && <p>Updating like on Review...</p>}
          {isUpdatingSuccess && <p>Is updated: {String(updatedReviewLike)}</p>}
          {isUpdatingError && <p>Failed to update like on Review.</p>}
          <button onClick={handleUpdateReviewLike}>
            Update Like on Review
          </button>
        </div>
      </div>
    )
  );
};

export default TestPage;
