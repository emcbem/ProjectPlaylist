import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import formatDate from "@/lib/date";
import { useContext } from "react";
import DOMPurify from "dompurify";
import "./Notifications.css";
import { NotificationQueries } from "@/queries/NotificationQueries";

const NotificationPage = () => {
  const { usr, isLoading } = useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { mutate: DeleteAllNotifications } =
    NotificationQueries.useDeleteAllNotification();

  const { mutate: DeleteNotification } =
    NotificationQueries.useRemoveNotification();

  const handleDeleteAll = (userId: number) => {
    DeleteAllNotifications(userId);
  };

  const handleDeleteSingle = (notiId: number) => {
    DeleteNotification(notiId);
  };

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
      <div className="flex flex-col w-full max-w-[1232px] dark:text-white text-black justify-start items-start mt-14">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-2xl">Notifications</h1>
          <h1
            className="text-base border-2 border-white rounded-lg p-2 cursor-pointer"
            onClick={() => handleDeleteAll(usr.id)}
          >
            Clear Notifications
          </h1>
        </div>

        <div className="w-full my-3">
          {usr.notifications.length > 0 ? (
            usr.notifications.map((noti) => (
              <>
                <div className="w-full flex flex-row items-end">
                  <div className="text-clay-700 mb-2">
                    {noti.dateNotified
                      ? formatDate(new Date(noti.dateNotified))
                      : "error"}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="notification-body prose dark:prose-invert flex flex-row items-center gap-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(noti.body || ""),
                      }}
                    ></div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDeleteSingle(noti.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3 text-clay-900 ml-auto"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </div>
                </div>
                <hr className="my-3 border border-clay-700" />
              </>
            ))
          ) : (
            <>
              <div className="w-full flex flex-row items-center justify-center">
                <div className="text-clay-700 mt-8 text-2xl">
                  Nothing to see here...
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
