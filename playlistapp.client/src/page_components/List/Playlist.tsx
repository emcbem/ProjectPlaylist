import { ListGame } from '@/@types/listgame';
import { ListQueries } from '@/hooks/ListQueries';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import EditListComponent from './EditListComponent';

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

            <p>List Id: {list?.id}</p>
            <p>User: {list?.ownerName}</p>

            <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 gap-2">
              {listGames && listGames?.map((g, key) => (
                <div key={key} className="w-50 m-5 dark:border-[#ffffff]">
                  <Link to={`/view-game/${g.id}`}>
                    {/* lg:w-50 lg:h-85 sm:w-60 sm:h-48 w-24 h-80 */}
                    <img className="img img-fluid w-full h-full object-cover" src={g.game.coverUrl} style={{ aspectRatio: '3 / 4' }} />
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