import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "@/@types/Page";
import { GameService } from "@/ApiServices/GameService";
import CardGamesList from "@/individual_components/CardGamesList";
import { SearchRequestController } from "@/@types/ComponentControllers/InfiniteGameController";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import LoadingPage from "@/individual_components/LoadingPage";

export const InfiniteGames: FC<SearchRequestController> = (controller) => {
  const observer = useRef<IntersectionObserver | null>();

  const {
    data: games,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["infiniteGames", controller.searchRequest],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) =>
      await GameService.GetFilteredGamesByRequest(
        Number(pageParam),
        controller.searchRequest
      ),
    getNextPageParam: (lastPage: Page) => {
      return lastPage.nextCursor;
    },
  });

  const [fetchedOnGames, setFetchedOnGames] = useState<Element[]>([]);

  useEffect(() => {
    setFetchedOnGames([]);
  }, [
    controller.searchRequest.title,
    controller.searchRequest.companyIds,
    controller.searchRequest.genreIds,
    controller.searchRequest.orderingMethod,
    controller.searchRequest.platformIds,
  ]);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (
            entries[0]?.isIntersecting &&
            hasNextPage &&
            !fetchedOnGames.find((x) => x === entries[0].target)
          ) {
            setFetchedOnGames((x) => [...x, entries[0].target]);
            fetchNextPage();
          }
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <>
      {games && (
        <div className="flex flex-col">
          <CardGamesList
            games={games.pages.flatMap((x) => x.pageGames)}
            ref={lastItemRef}
          />
        </div>
      )}
      {isFetching && (
        <div className="min-h-screen bg-white dark:bg-black dark:text-white w-full">
          <LoadingPage />
        </div>
      )}
      {!isFetching &&
        games?.pages.length == 1 &&
        games.pages[0].pageGames.length == 0 && (
          <div className="flex justify-center flex-col w-full pt-10">
            <QuestionMarkCircleIcon className="w-full h-[100px]" />
            <p className="w-full text-center pt-3">No Games found</p>
          </div>
        )}
    </>
  );
};
