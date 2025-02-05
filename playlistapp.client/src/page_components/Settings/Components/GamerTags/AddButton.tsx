import { AddUserPlatformRequest } from "@/@types/Requests/AddRequests/addUserPlatformRequest";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";
import { Platform } from "./Platforms";
import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import { useState } from "react";
import PlaystationResultList from "./PlaystationResultList";
import LoadingDots from "../SVGs/LoadingDots";

const AddButton = ({
  platform,
  userGuid,
  value,
  isVisible,
  setIsVisible,
  setSearched,
}: {
  platform: Platform | null;
  userGuid: string;
  value: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  setSearched: () => void;
}) => {
  const [playstationUserResults, setPlaystationUserResults] =
    useState<PlaystationUser[]>();
  const [selectedPSUser, setSelectedPSUser] = useState<
    PlaystationUser | undefined
  >();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: addUserPlatform } =
    UserPlatformQueries.AddUserPlatform();
  const { mutateAsync: searchForPlaystationUser } =
    PlaystationQueries.useGetPlaystationUsersBasedOffUsername(value);

  const AddUserPlatform = async () => {
    if (platform) {
      const request: AddUserPlatformRequest = {
        platformId: platform.id,
        userId: userGuid,
        gamerTag: selectedPSUser ? selectedPSUser.onlineId : value,
        externalPlatformId: "One",
        isPublic: true,
      };
      console.log(request, "hm");
      await addUserPlatform(request);
      setPlaystationUserResults([]);
      if (platform.id == 7) {
        setSearched();
      }
      setIsVisible(false);
    }
  };

  const SearchPlaystationUsers = async () => {
    if (value) {
      setSelectedPSUser(undefined);
      setSearched();
      setLoading(true);
      try {
        const result: PlaystationUser[] = await searchForPlaystationUser();
        setPlaystationUserResults(result);
      } catch (error) {
        console.error("Error fetching PlayStation users:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchClick = async () => {
    await SearchPlaystationUsers();
    setIsVisible(!isVisible);
  };

  const searchAgain = () => {
    setSelectedPSUser(undefined);
    setPlaystationUserResults([]);
    setSearched();
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        onClick={platform?.id == 7 ? handleSearchClick : AddUserPlatform}
        className={`${
          !isVisible || loading ? "hidden" : ""
        } bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded inline-block ml-4`}
      >
        {platform?.id == 7 ? "Search" : "Add"}
      </button>
      <div className={`${loading ? "w-full" : "hidden"}`}>
        <LoadingDots />
      </div>
      <div>
        {playstationUserResults && (
          <PlaystationResultList
            PlaystationUserResults={playstationUserResults.slice(0, 14)}
            setSearchAgain={searchAgain}
            display={playstationUserResults.length > 0}
            selectedPSUser={selectedPSUser}
            setSelectedPSUser={setSelectedPSUser}
            handleSave={AddUserPlatform}
          />
        )}
      </div>
    </>
  );
};

export default AddButton;
