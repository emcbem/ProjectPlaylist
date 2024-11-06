import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { GameReviewService } from "@/ApiServices/GameReviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/GameReviewKeys";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";
import toast from "react-hot-toast";

export const GameReviewQueries = {
  useAddGameReview: (
    addGameReviewRequest: AddGameReviewRequest,
    gameId: number
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GameReviewService.AddGameReview(addGameReviewRequest),
      onSuccess: () => {
        toast.success("Added Review!");
        queryClient.invalidateQueries({
          queryKey: keys.AddGameReview,
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: keys.GetAllGameReviewsByGame(gameId),
          refetchType: "all",
        });
      },
      onError: (error) => {
        console.error("Error adding review to game: ", error);
      },
    });
    /*
    const newGameReview: AddGameReviewRequest = {
        gameId: Number(gameId),
        rating: 5,
        text: "this is a test review",
        userId: usr?.id ?? 0,
    };

    const {
        mutate: addGameReview,
        data: newGameReviewId,
        isPending: isAddingGameReview,
        isError: isAddingGameReviewError,
        isSuccess: isAddingGameReviewSuccess,
    } = GameReviewQueries.useAddGameReview(newGameReview);

    const handleAddGameReview = () => {
        addGameReview();
    };
    */
  },
  useGetGameReviewById: (gameReviewId: number) => {
    return useQuery({
      queryKey: keys.GetGameReviewById,
      queryFn: () => GameReviewService.GetGameReviewById(gameReviewId),
    });
    /*
      const GameReviewById = GameReviewQueries.useGetGameReviewById(8).data;
    */
  },
  useGetAllGameReviewsByGame: (gameId: number) => {
    return useQuery({
      queryKey: keys.GetAllGameReviewsByGame(gameId),
      queryFn: () => GameReviewService.GetAllGameReviewsByGame(gameId),
    });
    /*
    const AllGameReviewsForGame = GameReviewQueries.useGetAllGameReviewsByGame(
        Number(gameId)
    ).data;
    */
  },
  useUpdateGameReview: (
    updateGameReviewRequest: UpdateGameReviewRequest,
    gameId: number
  ) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        GameReviewService.UpdateGameReview(updateGameReviewRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateGameReview });
        queryClient.invalidateQueries({
          queryKey: keys.GetAllGameReviewsByGame(gameId),
          refetchType: "all",
        });
      },
    });
    /*
    const updateGameReviewRequest: UpdateGameReviewRequest = {
        gameReviewId: 8,
        rating: 10,
        reviewText: "New Review Text",
    };

    const {
        mutate: updateGameReview,
        data: updatedGameReview,
        isPending: isUpdatingGameReview,
        isError: isUpdatingGameReviewError,
        isSuccess: isupdatingGameReviewSuccess,
    } = GameReviewQueries.useUpdateGameReview(updateGameReviewRequest);

    const handleUpdateGameReview = () => {
        updateGameReview();
    };
    */
  },
  useDeleteGameReview: (gameReviewId: number, gameId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => GameReviewService.DeleteGameReview(gameReviewId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteGameReview });
        queryClient.invalidateQueries({
          queryKey: keys.GetAllGameReviewsByGame(gameId),
          refetchType: "all",
        });
      },
    });
    /*
    const {
        mutate: deleteGameReview,
        data: deletedGameReview,
        isPending: isDeletingGameReview,
        isError: isDeletingGameReviewError,
        isSuccess: isDeletingGameReviewSuccess
    } = GameReviewQueries.useDeleteGameReview(8);

    const handleDeleteGameReview = () => {
        deleteGameReview();
    }
    */
  },
};
