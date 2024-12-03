import { Genre } from '@/@types/genre';
import { AddUserGenreRequest } from '@/@types/Requests/AddRequests/addUserGenreRequest';
import { RemoveUserGenreRequest } from '@/@types/Requests/DeleteRequests/removeUserGenreRequest';
import { GenreQueries } from '@/queries/GenreQueries';
import { UserGenreQueries } from '@/queries/UserGenreQueries'

const EditUserGenresList = ({ userGuid }: { userGuid: string | undefined }) => {
  const { data: userGenres } = UserGenreQueries.useGetAllByUser(userGuid ?? "")
  const { mutateAsync: addGenre } = UserGenreQueries.useAddUserGenreQuery(userGuid ?? "")
  const { mutateAsync: removeGenre } = UserGenreQueries.useDeleteUserGenreQuery(userGuid ?? "")
  const { data: allGenres } = GenreQueries.useGetAllGenres();

  const handleAddGenre = async (genre: Genre) => {
    const newGenreRequest: AddUserGenreRequest = {
      userId: userGuid ?? "",
      genreId: genre.id
    }
    await addGenre(newGenreRequest)
  }

  const handleRemoveGenre = async (userGenre: Genre) => {
    const removeUserGenreRequest: RemoveUserGenreRequest = {
      userId: userGuid ?? "",
      genreId: userGenre.id
    }
    await removeGenre(removeUserGenreRequest)
  }


  return (
    <>
      <div className="flex flex-wrap mb-3">
        {userGenres && userGenres.map((userGenre, key) => (
          <div key={key} role="button"
            className="group rounded-full p-1 px-3 dark:border-2 bg-clay-500 text-white dark:bg-white dark:text-black border-clay-900 dark:border-[#ffffff] m-1 flex flex-row items-center"  onClick={() => handleRemoveGenre(userGenre)}>
            {userGenre.name}
            <span className='text-lg ml-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {allGenres && allGenres.filter(x => !userGenres?.some(y => y.name === x.name)).map((genre, key) => (
          <div key={key} role="button" className="rounded-full p-1 px-3 border border-clay-900 dark:border-[#ffffff] m-1" onClick={() => handleAddGenre(genre)}>
            {genre.name}
          </div>
        ))}
      </div>
    </>
  )
}

export default EditUserGenresList