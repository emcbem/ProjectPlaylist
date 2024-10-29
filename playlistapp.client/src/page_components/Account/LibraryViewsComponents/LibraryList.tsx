import { UserGame } from '@/@types/usergame'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface props {
    userGamesFromUser: UserGame[] | undefined
}

const LibraryList: FC<props> = ({ userGamesFromUser }) => {
    return (
        <>
            <div className="flex flex-nowrap overflow-hidden relative">
                {userGamesFromUser && (
                    userGamesFromUser.slice(0, 5).map((ug, key) => (
                        <div key={key} className="m-2 flex-shrink-0">
                            <img src={ug.platformGame.game.coverUrl} width={150} style={{ aspectRatio: '3 / 4' }} className="object-cover" />
                        </div>
                    )))
                }

                <Link to={'/library'} >
                    <div className="absolute bottom-0 left-0 right-0 h-30 flex items-center justify-end opacity-100 dark:opacity-80 customGradient p-5">
                        <p className="text-white text-2xl me-2">View All<br />
                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default LibraryList