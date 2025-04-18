import { UserAccount } from "@/@types/userAccount";
import { ListQueries } from "@/queries/ListQueries";
import { Link, useParams } from "react-router-dom";
import AddListBtn from "./AddListBtn";
import { Game } from "@/@types/game";

const PlaylistLists = ({ usr }: { usr: UserAccount }) => {
  const { id } = useParams<{ id: string }>();
  const { data: lists } = ListQueries.useGetListsByUserId(usr.guid ?? "");
  const fillGame: Game = {
    id: 0,
    idgb_id: 0,
    title: "",
    description: "",
    ageRating: "",
    publishDate: new Date(),
    coverUrl: "https://lipsum.app/400x400/717272/717272",
    companies: [],
    genres: [],
    hoursPlayed: 0,
    platforms: [],
    reviews: [],
    totalOwned: 0,
  } as Game;

  return (
    <>
      <div className="flex flex-row md:justify-normal justify-between mt-6">
        {id ? (
          <p className="md:text-4xl mt-8 text-3xl">
            {usr.username}'s Playlists
          </p>
        ) : (
          <>
            <p className="md:text-4xl mt-8 text-3xl">Your Playlists</p>
            <div className="mt-auto mb-3 ms-6 md:me-0 me-5">
              <AddListBtn usr={usr} />
            </div>
          </>
        )}
      </div>
      {lists?.length == 0 && <p className="text-gray-400">Nothing to be found here...</p>}
      <div></div>

      <div className="flex flex-row overflow-x-auto flex-wrap mt-8">
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
                <Link
                  to={id ? `/user/${id}/list/${list.id}` : `/list/${list.id}`}
                >
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
