import { FC, useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "@/@types/Page";
import { GameService } from "@/ApiServices/GameService";
import CardGamesList from "@/individual_components/CardGamesList";
import { SearchRequestController } from "@/@types/ComponentControllers/InfiniteGameController";
import { LoaderIcon } from "react-hot-toast";

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
        <div className="flex flex-col">
          <CardGamesList
            games={games.pages.flatMap((x) => x.pageGames)}
            ref={lastItemRef}
          />
        </div>
      )}
      {isFetching && (
        <div className="flex justify-center">
          <LoaderIcon className="w-[50px] h-[50px]"></LoaderIcon>
        </div>
      )}
      {!isFetching && games?.pages.length == 1 && games.pages[0].pageGames.length == 0 &&
        <div className="flex justify-center">

          <p>No Games found</p>
        </div>
      }
    </>
  );
};
