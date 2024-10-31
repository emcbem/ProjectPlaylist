import { UserGame } from '@/@types/usergame';
import TrashIconGray from '@/assets/Icons/Trash';
import { FC } from 'react'
import { Link } from 'react-router-dom';

interface MyLibraryGridViewProps {
    games: UserGame[];
}

const MyLibraryGridView: FC<MyLibraryGridViewProps> = ({ games }) => {
    return (
        <div className="flex flex-wrap">
            {games.map((ug, key) => (
                <Link key={key} to={`/user-view-game/${ug.platformGame.game.id}`} className="m-2 w-36">
                    <div className="relative group">
                        <div className="absolute bottom-2 left-2">
                            {ug.platformGame.platform && (
                                <div className='group-hover:block hidden'>
                                    <button className="bg-white py-1 px-2 rounded"><TrashIconGray /></button>
                                </div>
                            )
                            }
                        </div>
                        <div className="overflow-hidden">
                            <img
                                className="img img-fluid w-full h-auto object-cover rounded-xl"
                                src={ug.platformGame.game.coverUrl}
                                style={{ aspectRatio: '3 / 4' }}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MyLibraryGridView