import { UserGenreQueries } from '@/hooks/UserGenreQueries'

const UserGenresList = ({ userGuid }: { userGuid: string | undefined }) => {
  const { data: userGenres } = UserGenreQueries.useGetAllByUser(userGuid ?? "")


  const handleAddUserGenreClick = () => {

  }

  return (
    <>
      <p className="mt-6 text-xl">Favorite Genres <span className='text-sm text-gray-400'>(Edit)</span></p>
      <div className="flex flex-wrap">
        {userGenres && userGenres.map((userGenre, key) => (
          <div key={key}
            className="rounded-full p-1 px-3 border-2 border-clay-900 dark:border-[#ffffff] m-1"
          >
            {userGenre.name}
          </div>
        ))}
        <div className="text-3xl" role="button" onClick={handleAddUserGenreClick}>+</div>
      </div>
    </>
  )
}

export default UserGenresList