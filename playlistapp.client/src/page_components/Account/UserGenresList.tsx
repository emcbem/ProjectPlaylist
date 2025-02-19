import { Genre } from "@/@types/genre";

const UserGenresList = ({ userGenres }: { userGenres: Genre[] }) => {
  return (
    <>
      {userGenres && (
        <>
          <p className="mt-6 text-xl md:block hidden">Favorite Genres</p>
          <div className="md:flex flex-wrap mb-3 hidden">
            {userGenres &&
              userGenres.map((userGenre, key) => (
                <div
                  key={key}
                  className="group rounded-full md:p-1 md:px-3 p-0.5 text-sm border-2 dark:bg-white dark:text-black border-clay-900 dark:border-[#ffffff] m-1 flex flex-row items-center"
                >
                  {userGenre.name}
                </div>
              ))}
          </div>
          <div className="md:hidden flex flex-row items-baseline justify-between">
            <p className="mt-6">Genres</p>
            <div>
              {userGenres &&
                userGenres
                  .slice(0, 2)
                  .map((userGenre, key) => (
                    <span key={key}>{userGenre.name}, </span>
                  ))}
              <span>+{userGenres.length - 2} more</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserGenresList;
