import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { ListQueries } from "@/hooks/ListQueries";
import React from "react";
import { Link } from "react-router-dom";
import AddListBtn from "./AddListBtn";
import { Game } from "@/@types/game";

const PlaylistLists = () => {
  const { usr, userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;
  const { data: lists } = ListQueries.useGetListsByUserId(userGuid ?? "");
  const fillGame: Game = {
    id: 0,
    idgb_id: 0,
    title: "",
    description: "",
    ageRating: "",
    publishDate: new Date(),
    coverUrl: "https://lipsum.app/400x400/717272/717272",
  };

  return (
    <>
      <div className="flex flex-row">
        <p className="mt-8 text-6xl">Your Playlists</p>
        <div className="mt-auto mb-3 ms-6">
          <AddListBtn usr={usr} />
        </div>
      </div>

      <div className="flex flex-row overflow-x-auto flex-wrap">
        {lists &&
          lists.map((list, key) => (
            <div className="xl:w-1/5 lg:w-1/5 md:w-1/2" key={key}>
              <div className="relative mx-5 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {list.games
                    .concat(Array(4).fill(fillGame))
                    .slice(0, 4)
                    .map((ug, key) => (
                      <div key={key} className="relative">
                        <img
                          src={ug.game ? ug.game.coverUrl : fillGame.coverUrl}
                          className="w-full h-full object-cover rounded-xl"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      </div>
                    ))}
                </div>
                <Link to={`/list/${list.id}`}>
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end opacity-100 dark:opacity-100 customGradient p-2">
                    <div>
                      <p className="text-white text-2xl me-2">
                        {list.name}
                        <br />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PlaylistLists;
