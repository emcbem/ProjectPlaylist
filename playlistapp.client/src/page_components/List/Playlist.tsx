import { ListGame } from '@/@types/listgame';
import { ListQueries } from '@/hooks/ListQueries';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EditListComponent from './EditListComponent';
import './Playlist.modules.scss';
import GridAndListIcons from '../../individual_components/GridAndListIcons';
import PlaylistListView from './PlaylistListView';
import PlaylistGridView from './PlaylistGridView';

const Playlist = () => {
  const { listId } = useParams<{ listId: string }>();
  const { data: list, isLoading } = ListQueries.useGetListByListId(listId ?? "");
  const { pathname } = useLocation();
  const [isListView, setIsListView] = useState<boolean>(true);
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
          <div className='ms-auto w-full'>
            <GridAndListIcons isListView={isListView} setIsListView={setIsListView} />
          </div>

          {!isListView ? (
            <PlaylistListView games={listGames} />
          ) : (
            <PlaylistGridView listGames={listGames} />
          )
          }


        </div>
      </div>
    </div >
  )
}

export default Playlist