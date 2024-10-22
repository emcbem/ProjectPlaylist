import { UpdateListRequest } from '@/@types/Requests/UpdateRequests/updateListRequest';
import { ListQueries } from '@/hooks/ListQueries';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Playlist = () => {
  const { listId } = useParams<{ listId: string }>();
  const { data: list } = ListQueries.useGetListByListId(listId ?? "");
  const { mutateAsync } = ListQueries.useUpdateListQuery();
  const [showEditNameBox, setshowEditNameBox] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    console.log(event.detail);
    switch (event.detail) {
      case 2: {
        setshowEditNameBox(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  {/* Update Name Stuff */ }
  const [value, setValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setIsEmpty(newValue.length === 0);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isEmpty) {
        var updatedList: UpdateListRequest = {
          listId: list?.id ?? -1,
          listName: value,
          newGames: list?.games ?? [],
          gamesToRemove: [],
          isPublic: list?.isPublic ?? false,
        }

        await mutateAsync(updatedList);
        setshowEditNameBox(false);
      }
    }
  };
  {/* End Update Name Stuff */ }

  console.log("LIST GAMES: ", list)

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <div className="grid justify-items-center ">
        <div style={{ maxWidth: '1200px' }} className='w-full mt-8 customGradient'>
          <div className="">
            <p onClick={handleClick} className={`${showEditNameBox ? "hidden" : ""} text-5xl`}>{list?.name}</p>
            <input type="text" value={value} className={`${showEditNameBox ? "" : "hidden"} bg-inherit text-5xl`} onChange={handleChange} onKeyDown={handleKeyPress} />
            <p>{list?.id}</p>
            <p>User Id: {list?.ownerName}</p>
            <p>{list?.games[0].name}</p>
            {list?.games && list.games.map((game, key) => (
              <p key={key}>Game Id: {game.gameId}</p>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Playlist