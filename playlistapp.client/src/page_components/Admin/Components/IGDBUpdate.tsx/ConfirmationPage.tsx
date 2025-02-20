export const ConfirmationPage = ({closeModal, startSync}: {closeModal: () => void, startSync: () => void}) => 
{
    return  <>
    <h2 className="text-3xl mb-4 dark:text-white text-clay-50">
      Are you sure you would like to sync IGDB?
    </h2>
    <p className="mb-6 text-red-600">
      Warning: This can take up 5 minutes. IGDB items that are no
      longer in the database will be deleted, causing data loss.
    </p>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={startSync}
      >
        Confirm
      </button>
      <button
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={closeModal}
        type="reset"
      >
        Cancel
      </button>
    </div>
  </>
}