import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import formatDate from "@/lib/date";
import { useContext } from "react";
import DOMPurify from "dompurify";
import "./Notifications.css";

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
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-2xl">Notifications</h1>
          <h1 className="text-base border-2 border-white rounded-lg p-2 cursor-pointer">Clear Notifications</h1>
        </div>

        <div className="w-full my-3">
          {usr.notifications.map((noti) => (
            <>
              <div className="w-full flex flex-row items-end">
                <div className="text-clay-700 mb-2">
                  {noti.dateNotified
                    ? formatDate(new Date(noti.dateNotified))
                    : "error"}
                </div>
              </div>
              <div className="notification-body prose dark:prose-invert flex flex-row items-center gap-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(noti.body || ""),
                  }}
                ></div>
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
