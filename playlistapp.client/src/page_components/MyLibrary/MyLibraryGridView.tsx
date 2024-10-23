import { UserGame } from '@/@types/usergame';
import { FC } from 'react'

interface MyLibraryGridViewProps {
    games: UserGame[];
}

const MyLibraryGridView: FC<MyLibraryGridViewProps> = ({ games }) => {
    return (
        <div className="flex flex-wrap relative">
            {games.map((ug, key) => (
                <div key={key} className="m-2">
                    <img src={ug.platformGame.game.coverUrl} width={250} className="hover:scale-105" />
                </div>
            ))}
        </div>
    )
}

export default MyLibraryGridView