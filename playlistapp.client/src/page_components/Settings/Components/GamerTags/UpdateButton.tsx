import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import { UpdateUserPlatformRequest } from "@/@types/Requests/UpdateRequests/UpdateUserPlatformRequest";
import { UserPlatform } from "@/@types/userPlatform";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";
import { useState } from "react";
import LoadingDots from "../SVGs/LoadingDots";
import PlaystationResultList from "./PlaystationResultList";
import WarningModal from "./WarningModal";

const UpdateButton = ({
  userPlatform,
  value,
  isVisible,
  setIsVisible,
  setSearched,
}: {
  userPlatform: UserPlatform | null;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: updateUserPlatforms } =
    UserPlatformQueries.UpdateUserPlatform();
  const { mutateAsync: searchForPlaystationUser } =
    PlaystationQueries.useGetPlaystationUsersBasedOffUsername(value);

  async function handleSave() {
    setIsModalOpen(true);
    if (userPlatform) {
      const updateRequest: UpdateUserPlatformRequest = {
        id: userPlatform.id,
        gamerTag: selectedPSUser ? selectedPSUser.onlineId : value,
        externalPlatformId: userPlatform?.externalPlatformId,
        isPublic: true,
      };
      await updateUserPlatforms(updateRequest);
      setPlaystationUserResults([]);
      if (userPlatform.platformId == 7) {
        setSearched();
      }
      setIsVisible(false);
    }
  }

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
      <WarningModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <button
        onClick={userPlatform?.platformId == 7 ? handleSearchClick : handleSave}
        className={`${
          !isVisible || loading ? "hidden" : ""
        } bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded inline-block ml-4 transition-all`}
      >
        {userPlatform?.platformId == 7 ? "Search" : "Add"}
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
            handleSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default UpdateButton;
