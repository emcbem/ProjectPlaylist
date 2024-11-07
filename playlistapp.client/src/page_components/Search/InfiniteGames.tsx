import { FC, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "@/@types/Page";
import { GameService } from "@/ApiServices/GameService";
import CardGamesList from "@/individual_components/CardGamesList";
import { SearchRequestController } from "@/@types/ComponentControllers/InfiniteGameController";

export const InfiniteGames: FC<SearchRequestController> = (controller) => {
  const observer = useRef<IntersectionObserver | null>();

  const {
    data: games,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["infiniteGames", controller.searchRequest],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      GameService.GetFilteredGamesByRequest(Number(pageParam), controller.searchRequest),
    getNextPageParam: (lastPage: Page) => {
      return lastPage.nextCursor;
    },
  });

  useEffect(() => {
    refetch();
  }, [controller.searchRequest]);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0]?.isIntersecting && hasNextPage) {
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
        <>
          <CardGamesList
            games={games.pages.flatMap((x) => x.pageGames)}
            ref={lastItemRef}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};
