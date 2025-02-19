import { UserAccountContextInterface } from "@/@types/userAccount";
import EpicIconCustom from "@/assets/CustomPlatformIcons/EpicLogoCustom";
import SwitchIconCustom from "@/assets/CustomPlatformIcons/SwitchIconCustom";
import XboxIconCustom from "@/assets/CustomPlatformIcons/XboxIconCustom";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";
import React from "react";
import GamerTag from "./GamerTag";

const GamerTags = () => {
  const { userGuid, usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  if (userGuid === undefined) {
    return <p>You're not logged in</p>;
  }

  const { data: usersPlatforms } = UserPlatformQueries.GetAllByUser(userGuid);

  if (usersPlatforms && usersPlatforms?.length <= 0) {
    return <p className="text-gray-400">Go to settings to add a gamertag.</p>;
  }

  return (
    <div className="">
      {usersPlatforms && usr && (
        <>
          {usersPlatforms.filter((x) => x.platformId === 1).length > 0 && (
            <div className="flex flex-row items-center mb-4">
              <GamerTag
                platform={{
                  id: 1,
                  name: "Epic Games",
                  logoURL: "https://example.com/logoC.png",
                }}
                userPlatforms={usersPlatforms}
              >
                <EpicIconCustom width={"30"} />
              </GamerTag>
            </div>
          )}
          {usersPlatforms.filter((x) => x.platformId === 130).length > 0 && (
            <div className="flex flex-row items-center mb-4">
              <GamerTag
                platform={{
                  id: 130,
                  name: "Nintendo",
                  logoURL: "https://example.com/logoC.png",
                }}
                userPlatforms={usersPlatforms}
              >
                <SwitchIconCustom width={"30"} />
              </GamerTag>
            </div>
          )}
          {usersPlatforms.filter((x) => x.platformId === 11).length > 0 && (
            <div className="flex flex-row items-center mb-4">
              <GamerTag
                platform={{
                  id: 11,
                  name: "Xbox",
                  logoURL: "https://example.com/logoB.png",
                }}
                userPlatforms={usersPlatforms}
              >
                <XboxIconCustom width={"30"} />
              </GamerTag>
            </div>
          )}
          {usersPlatforms.filter((x) => x.platformId === 7).length > 0 && (
            <div className="flex flex-row items-center mb-4">
              <GamerTag
                platform={{
                  id: 7,
                  name: "PlayStation",
                  logoURL: "https://example.com/logoC.png",
                }}
                userPlatforms={usersPlatforms}
              >
                <svg
                  width={38}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0.78 4 22 17"
                  className="transition-colors duration-300 fill-current group-hover:fill-[#FFFFFF]"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M22.584 17.011c-.43.543-1.482.93-1.482.93l-7.833 2.817V18.68l5.764-2.057c.655-.234.755-.566.223-.74-.53-.175-1.491-.125-2.146.111l-3.84 1.354v-2.155l.22-.075s1.11-.394 2.671-.567c1.56-.172 3.472.024 4.972.593 1.69.535 1.88 1.323 1.451 1.866zm-8.57-3.537V8.162c0-.624-.114-1.198-.699-1.36-.447-.144-.725.272-.725.895V21l-3.584-1.139V4c1.524.283 3.744.953 4.937 1.355 3.035 1.043 4.064 2.342 4.064 5.267 0 2.851-1.758 3.932-3.992 2.852zm-11.583 4.99c-1.735-.49-2.024-1.51-1.233-2.097.731-.542 1.974-.95 1.974-.95l5.138-1.83v2.086l-3.697 1.325c-.653.234-.754.566-.223.74.531.175 1.493.125 2.147-.11l1.773-.644v1.865l-.353.06c-1.774.29-3.664.169-5.526-.445z" />
                </svg>
              </GamerTag>
            </div>
          )}
          {usersPlatforms.filter((x) => x.platformId === 136).length > 0 && (
            <div className="flex flex-row items-center mb-4">
              <GamerTag
                platform={{
                  id: 163,
                  name: "Steam",
                  logoURL: "https://example.com/logoA.png",
                }}
                userPlatforms={usersPlatforms}
              >
                <svg
                  width={34}
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300 fill-current group-hover:fill-[#FFFFFF]"
                  version="1.1"
                  viewBox="1.03 1 29.94 29.99"
                >
                  <path d="M18.102 12.129c0-0 0-0 0-0.001 0-1.564 1.268-2.831 2.831-2.831s2.831 1.268 2.831 2.831c0 1.564-1.267 2.831-2.831 2.831-0 0-0 0-0.001 0h0c-0 0-0 0-0.001 0-1.563 0-2.83-1.267-2.83-2.83 0-0 0-0 0-0.001v0zM24.691 12.135c0-2.081-1.687-3.768-3.768-3.768s-3.768 1.687-3.768 3.768c0 2.081 1.687 3.768 3.768 3.768v0c2.080-0.003 3.765-1.688 3.768-3.767v-0zM10.427 23.76l-1.841-0.762c0.524 1.078 1.611 1.808 2.868 1.808 1.317 0 2.448-0.801 2.93-1.943l0.008-0.021c0.155-0.362 0.246-0.784 0.246-1.226 0-1.757-1.424-3.181-3.181-3.181-0.405 0-0.792 0.076-1.148 0.213l0.022-0.007 1.903 0.787c0.852 0.364 1.439 1.196 1.439 2.164 0 1.296-1.051 2.347-2.347 2.347-0.324 0-0.632-0.066-0.913-0.184l0.015 0.006zM15.974 1.004c-7.857 0.001-14.301 6.046-14.938 13.738l-0.004 0.054 8.038 3.322c0.668-0.462 1.495-0.737 2.387-0.737 0.001 0 0.002 0 0.002 0h-0c0.079 0 0.156 0.005 0.235 0.008l3.575-5.176v-0.074c0.003-3.12 2.533-5.648 5.653-5.648 3.122 0 5.653 2.531 5.653 5.653s-2.531 5.653-5.653 5.653h-0.131l-5.094 3.638c0 0.065 0.005 0.131 0.005 0.199 0 0.001 0 0.002 0 0.003 0 2.342-1.899 4.241-4.241 4.241-2.047 0-3.756-1.451-4.153-3.38l-0.005-0.027-5.755-2.383c1.841 6.345 7.601 10.905 14.425 10.905 8.281 0 14.994-6.713 14.994-14.994s-6.713-14.994-14.994-14.994c-0 0-0.001 0-0.001 0h0z" />
                </svg>
              </GamerTag>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GamerTags;
