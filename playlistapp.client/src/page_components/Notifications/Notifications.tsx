import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import formatDate from "@/lib/date";
import { useContext } from "react";

const NotificationPage = () => {
  const { usr, isLoading } = useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  if (isLoading) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        Loading...
      </div>
    );
  }

  if (!usr || (!usr && !isLoading)) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        Error Fetching Notifications
      </div>
    );
  }

  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col w-full max-w-[750px] dark:text-white text-black justify-start items-start mt-14">
        <h1 className="text-2xl">Notifications</h1>
        <div className="w-full my-3">
          {usr.notifications.map((noti) => (
            <>
              <div className="w-full  flex flex-row">
                <div>{noti.title}</div>
                <div className="text-clay-700">
                  &nbsp;-&nbsp;
                  {noti.dateNotified
                    ? formatDate(new Date(noti.dateNotified))
                    : "error"}
                </div>
              </div>
              <hr className="my-3 border border-clay-700" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;

{
  /* <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(noti.body || ""),
                }}
              ></div> */
}
