import { UserGenreQueries } from '@/hooks/UserGenreQueries'

const UserGenresList = ({ userGuid }: { userGuid: string | undefined }) => {
  const { data: userGenres } = UserGenreQueries.useGetAllByUser(userGuid ?? "")

  return (
    <>
      <div className="flex flex-wrap mb-3">
        {userGenres && userGenres.map((userGenre, key) => (
          <div key={key}
            className="group rounded-full p-1 px-3 border-2 dark:bg-white dark:text-black border-clay-900 dark:border-[#ffffff] m-1 flex flex-row items-center">
            {userGenre.name}
          </div>
        ))}
      </div>
    </>
  )
}

export default UserGenresList