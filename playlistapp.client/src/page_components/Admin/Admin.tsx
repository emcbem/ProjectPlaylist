import IGBDUpdate from "./Components/IGBDUpdate";
import PSNUpdate from "./Components/PSNUpdate";

const AdminPage = () => {
  //   const { usr, isLoading } = useContext(
  //     UserAccountContext
  //   ) as UserAccountContextInterface;

  //   if (isLoading) {
  //     return (
  //       <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
  //         Loading...
  //       </div>
  //     );
  //   }

  //   if (!usr || (!usr && !isLoading)) {
  //     return (
  //       <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
  //         Error Fetching Notifications
  //       </div>
  //     );
  //   }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full max-w-[1264px] dark:text-white text-black justify-start items-start mt-14">
        <div className="w-full flex lg:justify-start justify-center">
          <h1 className="text-4xl font-bold ">Admin Page</h1>
        </div>
        <div className="w-full my-3 flex lg:flex-row flex-col">
          <IGBDUpdate />
          <PSNUpdate />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
