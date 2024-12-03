import { ListGame } from "@/@types/listgame";
import { ListQueries } from "@/queries/ListQueries";
import GridAndListIcons from "@/individual_components/GridAndListIcons";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import PlaylistGridView from "./ViewPlaylistGridView";
import PlaylistTableView from "./ViewPlaylistListView";
import "./ViewPlaylist.modules.scss";

const Playlist = () => {
  const { listId } = useParams<{ listId: string }>();
  const { data: list, isLoading } = ListQueries.useGetListByListId(
    listId ?? ""
  );
  const { pathname } = useLocation();
  const [isListView, setIsListView] = useState<boolean>(true);
  const [listGames, setlistGames] = useState<ListGame[] | undefined>(
    list?.games
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setlistGames(list?.games);
  }, [pathname, list]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <div className="grid justify-items-center ">
        <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
          <div className="text-lg mt-6 mb-6">
            <Link to={"/account"}>
              <span className="hover:underline underline-offset-2">
                Account
              </span>
            </Link>{" "}
            <span className="text-clay-950  font-light">/ {list?.name}</span>
          </div>
          <div className="flex flex-row justify-between align-bottom">
            <p className={`text-5xl`}>{list?.name}</p>
          </div>
          <div className="flex flex-row justify-left align-middle mt-4 mb-3">
            <p className="me-8 text-xl text-clay-950">{list?.ownerName}</p>
            <p className="text-xl text-clay-950">
              {list?.games.length} {list?.games.length === 1 ? "Game" : "Games"}
            </p>
          </div>
          <div className="ms-auto w-full">
            <GridAndListIcons
              isListView={isListView}
              setIsListView={setIsListView}
            />
          </div>

          {!isListView ? (
            <PlaylistTableView games={listGames} list={list} />
          ) : (
            <PlaylistGridView listGames={listGames} list={list} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
