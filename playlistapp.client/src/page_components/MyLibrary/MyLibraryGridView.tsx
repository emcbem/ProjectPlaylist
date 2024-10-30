import { UserGame } from '@/@types/usergame';
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
                    <div className="overflow-hidden">
                        <img
                            className="img img-fluid w-full h-auto object-cover"
                            src={ug.platformGame.game.coverUrl}
                            style={{ aspectRatio: '3 / 4' }}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MyLibraryGridView