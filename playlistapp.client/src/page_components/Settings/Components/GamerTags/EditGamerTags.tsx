import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";
import React from "react";
import PlatformList from "./PlatformList";
import platforms from "./Platforms";
const EditGamerTags = () => {
  const { userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;
  if (userGuid === undefined) {
    return <p>You're not logged in</p>;
  }

  const { data: usersPlatforms } = UserPlatformQueries.GetAllByUser(userGuid);

  return (
    <div className="">
      {platforms.map((p) => {
        return (
          <div key={p.id} className="mt-4">
            <div className="flex flex-row items-center mb-8">
              <PlatformList
                platform={p}
                userPlatforms={usersPlatforms}
                userGuid={userGuid}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default EditGamerTags;
