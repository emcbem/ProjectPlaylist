import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { GameReviewService } from "@/ApiServices/GameReviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/GameReviewKeys";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";

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
  useGetGameReviewById: (gameReviewId: number) => {
    return useQuery({
      queryKey: keys.GetGameReviewById,
      queryFn: () => GameReviewService.GetGameReviewById(gameReviewId),
    });
  },
  useGetAllGameReviewsByGame: (gameId: number) => {
    return useQuery({
      queryKey: keys.GetAllGameReviewsByGame,
      queryFn: () => GameReviewService.GetAllGameReviewsByGame(gameId),
    });
  },
  useUpdateGameReview: (updateGameReviewRequest: UpdateGameReviewRequest) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        GameReviewService.UpdateGameReview(updateGameReviewRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateGameReview });
      },
    });
  },
};
