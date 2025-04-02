import { UserAccount } from "@/@types/userAccount";
import { Link } from "react-router-dom";
import FriendStatus from "../SearchUsers/FriendStatus";

const FriendCard = ({ user }: { user: UserAccount }) => {

  return (
    <Link
      className="rounded-lg mt-3 flex flex-row align-middle items-center justify-between p-5 w-50 transition-all shadow-lg dark:bg-clay-100 md:m-5 my-2 shadow-pporange-100 dark:shadow-pppurple-600 dark:hover:shadow-pporange-700 duration-300 bg-stone-50 cursor-pointer"
      to={`/user/${user.guid}`}
    >
      <div className="flex flex-row">
        <img
          className="rounded-full md:w-24 md:h-24 w-14 h-14 shadow-inner dark:bg-gray-200 bg-clay-600 p-2 md:p-3"
          src={user.profileURL ?? ""}
        />
        <div className="ms-3 flex h-full flex-col mt-3">
          <p className="md:text-xl md:font-semibold">{user.username}</p>

          <p className="text-sm dark:text-clay-950 text-clay-700 font-sans">
            {user.xp ?? "0"} Xp &#x2022; {user.userGames.length} Games
          </p>
        </div>
      </div>
      <FriendStatus user={user} />
    </Link>
  );
};

export default FriendCard;
