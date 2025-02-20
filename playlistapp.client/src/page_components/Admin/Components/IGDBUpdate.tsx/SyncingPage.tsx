export const SyncingPage = ({ progress }: { progress: number }) => {
  return (
    <>
      <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
        Syncing IGDB...
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div className="relative h-4 rounded-full overflow-hidden bg-gray-300">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pporange-500 via-pppurple-400 to-pporange-500 transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundSize: "200% 100%",
              animation: "gradientSlide 2s linear infinite",
            }}
          ></div>
        </div>
      </div>
      <p className="mt-4 text-center dark:text-white text-clay-50">
        {progress.toFixed(0)}% complete
      </p>
    </>
  );
};
