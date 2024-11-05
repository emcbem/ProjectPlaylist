import { ListGame } from '@/@types/listgame';
import { FC } from 'react'
import { List } from '@/@types/list';

interface props {
    listGames: ListGame[] | undefined;
    list: List | undefined;
}

const PlaylistGridView: FC<props> = ({ listGames, list }) => {
    if (!listGames || listGames.length <= 0) {
        return (
            <div>
                <p className="text-lg">Looks like you don't have any games added to this playlist yet...</p>
            </div>
        )
    }

    console.log(list)

    return (
        <div className="flex flex-wrap">
            {listGames && listGames?.map((listGame, key) => (
                <div key={key}>{listGame.id}, </div>
                // <Link key={key} to={`/user-view-game/${listGame}`} className="m-2 w-36">
                //     <div className="relative group">
                //         <div className="absolute bottom-2 left-2">
                //             <div className="hidden group-hover:block">
                //                 <RemoveFromListButton listGame={listGame} list={list} />
                //             </div>
                //         </div>
                //         <div className="overflow-hidden">
                //             <img
                //                 className="img img-fluid w-full h-auto object-cover rounded-xl"
                //                 src={listGame.game.coverUrl}
                //                 style={{ aspectRatio: '3 / 4' }}
                //             />
                //         </div>
                //     </div>
                // </Link>
            ))}
        </div>
    )
}

export default PlaylistGridView