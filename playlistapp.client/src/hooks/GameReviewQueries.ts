import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { GameReviewService } from "@/ApiServices/GameReviewService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/GameReviewKeys";

export const GameReviewQueries = {
  useAddGameReview: (addGameReviewRequest: AddGameReviewRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GameReviewService.AddGameReview(addGameReviewRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddGameReview });
      },
      onError: (error) => {
        console.error("Error adding review to game: ", error);
      },
    });
  },
};
