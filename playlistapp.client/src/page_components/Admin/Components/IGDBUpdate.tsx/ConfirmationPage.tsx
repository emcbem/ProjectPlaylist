export const ConfirmationPage = () => {
  return (
    <>
      <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
        Are you sure you would like to sync IGDB?
      </h2>
      <p className="mb-6 text-red-600">
        Warning: This can take up 5 minutes. IGDB items that are no longer in
        the database will be deleted, causing data loss.
      </p>
    </>
  );
};
