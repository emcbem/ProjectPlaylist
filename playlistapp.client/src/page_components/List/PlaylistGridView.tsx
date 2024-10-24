import { ListGame } from '@/@types/listgame';
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface props {
    listGames: ListGame[] | undefined;
}

const PlaylistGridView: FC<props> = ({ listGames }) => {
    return (
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
    )
}

export default PlaylistGridView