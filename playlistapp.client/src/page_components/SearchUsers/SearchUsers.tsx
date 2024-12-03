import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/queries/FriendQueries";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import { useSearchBarContext } from "@/queries/useSearchBarContext";
import React from "react";
import PendingFriends from "../Account/PendingFriends";
import { FilterMyPendingFriends } from "../Account/logic/FilterMyPendingFriends";
import SearchResults from "./SearchResults";

const SearchUsers = () => {
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const searchBarContext = useSearchBarContext();

  const {
    data: users,
    isLoading,
    isError,
  } = UserAccountQueries.useGetUserBySearch(searchBarContext.searchQuery);

  const { data: pendingFriends } = FriendQueries.GetPendingFriendRequestsQuery(
    usr?.id ?? 0
  );

  if (isLoading && !isError && searchBarContext.searchQuery.length > 0) {
    return (
      <div className="grid justify-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid justify-items-center">
        <p>Something went wrong...</p>
      </div>
    );
  }

  if (
    Array.isArray(users) &&
    users.length > 0 &&
    searchBarContext.searchQuery.length > 0
  ) {
    const firstUser = users[0];
    if (!firstUser.username || firstUser.username === "") {
      return (
        <div className="grid justify-items-center">
          <p>No users match your search.</p>
        </div>
      );
    }
  } else {
    return (
      <div className="grid justify-items-center">
        <p>No users found with username {searchBarContext.searchQuery}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div style={{ maxWidth: "600px" }} className="w-full mt-8 ">
        {users &&
          users.map((user, key) => {
            return (
              <>
                <SearchResults key={key} user={user} />
              </>
            );
          })}
      </div>
      <div
        className={`mt-8 ms-10 ${
          pendingFriends &&
          FilterMyPendingFriends(pendingFriends, usr?.id ?? 0)?.length <= 0
            ? "w-0"
            : "xl:w-1/5 md:1/3 w-1/2"
        }`}
      >
        {usr && pendingFriends && (
          <PendingFriends pendingFriends={pendingFriends} usr={usr} />
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
