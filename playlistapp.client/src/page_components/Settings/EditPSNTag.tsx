import { AddUserPlatformRequest } from "@/@types/Requests/AddRequests/addUserPlatformRequest";
import { UserPlatform } from "@/@types/userPlatform";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";
import { FC, useEffect, useState } from "react";
import { SyncButton } from "./Buttons/SyncButton";
import { PlaystationQueries } from "@/queries/PlaystationQueries";
import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import PlaystationResultList from "./Components/PlaystationResultList";
import LoadingDots from "./Components/LoadingDots";
import PSIconCustom from "@/assets/CustomPlatformIcons/PSLogoCustom";
import { UpdateUserPlatformRequest } from "@/@types/Requests/UpdateRequests/UpdateUserPlatformRequest";

interface EditGamerTagFieldProps {
  userPlatforms: UserPlatform[] | undefined;
  userGuid: string;
}

const EditPSNTag: FC<EditGamerTagFieldProps> = ({
  userPlatforms,
  userGuid,
}) => {
  const [selectedPSUser, setSelectedPSUser] = useState<PlaystationUser>();
  const [userPlatform, setUserPlatform] = useState<UserPlatform | null>(null);
  const [value, setValue] = useState<string>(""); // initialize to an empty string instead of undefined
  const [playstationUserResults, setPlaystationUserResults] =
    useState<PlaystationUser[]>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [width, setWidth] = useState<string>("30");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { mutateAsync: updateUserPlatforms } =
    UserPlatformQueries.UpdateUserPlatform();
  const { mutateAsync: addUserPlatform } =
    UserPlatformQueries.AddUserPlatform();
  const { mutateAsync: deleteUserPlatform } =
    UserPlatformQueries.DeleteUserPlatform();
  const { mutateAsync: searchForPlaystationUser } =
    PlaystationQueries.useGetPlaystationUsersBasedOffUsername(value);

  useEffect(() => {
    if (userPlatforms != undefined) {
      const matchedPlatform = userPlatforms.find((x) => x.platformId === 7);
      if (matchedPlatform) {
        setUserPlatform(matchedPlatform);
        setValue(matchedPlatform.gamerTag || "");
      } else {
        setUserPlatform(null);
        setValue("");
      }
    }
  }, [userPlatforms]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const clearPSResults = () => {
    setWidth("30");
    setHasSearched(false);
    setPlaystationUserResults([]);
  };

  const handleSearchClick = async () => {
    if (value.length <= 0) {
      handleRemove();
    }
    if (!userPlatform) {
      await AddUserPlatform();
    } else {
      await SearchPlaystationUsers();
      setIsVisible(!isVisible);
    }
  };

  const handleSave = async () => {
    if (selectedPSUser == undefined) return;
    if (!userPlatform) {
      await AddUserPlatform();
    } else {
      const updateRequest: UpdateUserPlatformRequest = {
        id: userPlatform?.id ?? 0,
        gamerTag: selectedPSUser.onlineId ?? "",
        externalPlatformId: String(7),
        isPublic: true,
      };
      await updateUserPlatforms(updateRequest);
      setWidth("30");
      setPlaystationUserResults([]);
      setHasSearched(false);
      setIsVisible(false);
    }
  };

  const handleRemove = async () => {
    if (userPlatform != undefined) {
      await deleteUserPlatform(userPlatform?.id);
    } else {
      console.error("User platform id was undefined");
    }
  };

  const AddUserPlatform = async () => {
    const request: AddUserPlatformRequest = {
      platformId: 7,
      userId: userGuid,
      gamerTag: value ?? "",
      externalPlatformId: "One",
      isPublic: true,
    };
    await addUserPlatform(request);
    await SearchPlaystationUsers();
    setIsVisible(!isVisible);
  };

  const SearchPlaystationUsers = async () => {
    if (value) {
      setHasSearched(true);
      setLoading(true); // Start loading before query
      try {
        const result: PlaystationUser[] = await searchForPlaystationUser();
        setPlaystationUserResults(result);
      } catch (error) {
        console.error("Error fetching PlayStation users:", error);
      } finally {
        setWidth("110");
        setLoading(false); // Stop loading when query is done
      }
    }
  };

  return (
    <div className={`flex flex-row items-start`}>
      <PSIconCustom width={width} />
      <div
        className={`flex flex-row ${
          isVisible ? "items-start" : "items-baseline"
        } justify-between ${hasSearched ? "hidden" : ""}`}
      >
        {!isVisible && userPlatform && (
          <h3 className="ml-4 text-xl font-sans">{userPlatform.gamerTag}</h3>
        )}

        <input
          type="text"
          onChange={handleChange}
          value={value}
          className={`${!isVisible ? "hidden" : ""} rounded ml-4 text-black`}
        />

        <p
          role="button"
          className={`text-teal-400 underline underline-offset-2 ms-5 ${
            isVisible ? "hidden" : ""
          }  ${!userPlatform ? "hidden" : ""}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          edit
        </p>

        <p
          role="button"
          className={`text-teal-400 underline underline-offset-2 ms-5 ${
            isVisible ? "hidden" : ""
          }  ${!userPlatform ? "hidden" : ""}`}
          onClick={handleRemove}
        >
          remove
        </p>

        <SyncButton isVisible={isVisible} userPlatform={userPlatform} />

        <button
          onClick={handleSearchClick}
          className={`${
            !isVisible ? "hidden" : ""
          } bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded inline-block ml-4`}
        >
          Search
        </button>

        {userPlatforms &&
          userPlatforms.filter((x) => x.platformId == 7).length <= 0 && (
            <p
              role="button"
              onClick={() => setIsVisible(!isVisible)}
              className={`ml-4 text-teal-400 underline underline-offset-2 ${
                isVisible ? "hidden" : ""
              } ${userPlatform ? "hidden" : ""}`}
            >
              Add a Gamertag for Playstation
            </p>
          )}
      </div>
      <div className={`${loading ? "w-full" : "hidden"}`}>
        <LoadingDots />
      </div>
      <div>
        {playstationUserResults && (
          <PlaystationResultList
            PlaystationUserResults={playstationUserResults.slice(0, 14)}
            setSearchAgain={() => clearPSResults()}
            display={playstationUserResults.length > 0}
            selectedPSUser={selectedPSUser}
            setSelectedPSUser={setSelectedPSUser}
            handleSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default EditPSNTag;
