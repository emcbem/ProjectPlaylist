import { PlaystationQueries } from "@/queries/PlaystationQueries";
import Button from "./Button";

const PSNUpdate = () => {
  const {
    mutate: refreshPlaystationToken,
    data: context,
    isPending: isFetching,
    isError: isFetchingError,
    isSuccess: isFetchingSuccess,
  } = PlaystationQueries.useGetPlaystationAccessToken();

  return (
    <div className="md:w-1/4 w-2/4 lg:ml-12 lg:mx-0 mx-12">
      <h1 className="md:text-3xl text-xl mt-8">Refresh PSN Key</h1>
      <hr className="h-px my-4 bg-black border-0 dark:bg-white" />
      <Button query={refreshPlaystationToken} message="Refresh" />

      {isFetching && <p>Refreshing...</p>}
      {isFetchingError && <p>Error refreshing token.</p>}
      {isFetchingSuccess && (
        <p>
          Token refreshed successfully! New code expires in{" "}
          {context?.expires_in} minutes!
        </p>
      )}
    </div>
  );
};

export default PSNUpdate;
