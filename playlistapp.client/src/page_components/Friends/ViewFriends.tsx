import { UserAccountContextInterface } from "@/@types/userAccount";
import FriendCard from "./FriendCard";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { FriendQueries } from "@/queries/FriendQueries";
import React from "react";
import { useParams } from "react-router-dom";
import { UserAccountQueries } from "@/queries/UserAccountQueries";

const ViewFriends = () => {
  const { id } = useParams<{ id: string }>();

  const { userGuid, isLoading: isUserLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const userId = id ?? userGuid;

  const { data: usr } = UserAccountQueries.useGetUserById(userId!);

  const { data: friends } = FriendQueries.GetAllFriendsByBaseIdQuery(
    userId ?? ""
  );

  if (isUserLoading) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        Loading...
      </div>
    );
  }

  if (!usr || (!usr && !isUserLoading)) {
    return (
      <div className="flex w-full dark:text-white text-black justify-center sm:mt-28 mt-14">
        Error Fetching Friends
      </div>
    );
  }

  if (!friends) {
    <>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="text-clay-700 mt-8 text-2xl">
          Nothing to see here...
        </div>
      </div>
    </>;
  }

  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col w-full max-w-[1232px] dark:text-white text-black justify-start items-start mt-14">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-2xl">{usr.username}'s Friends</h1>
        </div>

        <div className="w-full my-3">
          {friends?.map((friend) => (
            <FriendCard user={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFriends;
