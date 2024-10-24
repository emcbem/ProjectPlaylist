import { ListGame } from '@/@types/listgame';
import { ListQueries } from '@/hooks/ListQueries';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import EditListComponent from './EditListComponent';
import './Playlist.modules.scss';

const Playlist = () => {
  const { listId } = useParams<{ listId: string }>();
  const { data: list, isLoading } = ListQueries.useGetListByListId(listId ?? "");
  const { pathname } = useLocation();

  const [listGames, setlistGames] = useState<ListGame[] | undefined>(list?.games);

  useEffect(() => {
    window.scrollTo(0, 0);
    setlistGames(list?.games)
  }, [pathname, list]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <div className="grid justify-items-center ">
        <div style={{ maxWidth: '1200px' }} className='w-full mt-8'>
          <EditListComponent list={list} />
          <div className="flex flex-row justify-left align-middle mt-4 mb-3">
            <p className="me-8 text-xl text-clay-900">{list?.ownerName}</p>
            <p className="text-xl text-clay-900">{list?.games.length} Games</p>
          </div>

          <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-3 gap-1">
            {listGames && listGames?.map((g, key) => (
              <div key={key} className="w-50 m-2 dark:border-[#ffffff]">
                <Link key={key} to={`/user-view-game/${g.gameId}`} className="">
                  <div className="overflow-hidden">
                    <img
                      className="img img-fluid w-full h-auto object-cover"
                      src={g.game.coverUrl}
                      style={{ aspectRatio: '3 / 4' }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div >
  )
}

export default Playlist