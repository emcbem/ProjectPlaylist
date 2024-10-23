import { Link } from 'react-router-dom'

const LibraryListNoGames = () => {
    return (
        <div className="relative w-3/4">
            <p>Looks like you don't have any games in your collection. Browse our games and add one!</p>
            <Link to={'/search'} >
                <div className="h-30 flex items-center justify-end opacity-100 dark:opacity-80 customGradient mt-5 p-5">
                    <div>
                        <p className="text-white text-2xl me-2">Add your first game <br />
                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default LibraryListNoGames