import { Platform } from "@/@types/platform";
import { UserPlatform } from "@/@types/userPlatform";
import { FC, useEffect, useState } from "react";
import { useHandleTyping } from "../../Hooks/useHandleTyping";
import UpdateButton from "./UpdateButton";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import SyncButton from "./SyncButton";
import { SteamSyncButton } from "../../Buttons/SteamSyncButton";

const Input: FC<{
  platform: Platform;
  userPlatforms: UserPlatform[];
  userGuid: string;
}> = ({ platform, userPlatforms, userGuid }) => {
  const [userPlatform, setUserPlatform] = useState<UserPlatform | null>(null);
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (userPlatforms != undefined) {
      const matchedPlatform = userPlatforms.find(
        (x) => x.platformId === platform.id
      );
      if (matchedPlatform) {
        setUserPlatform(matchedPlatform);
        setValue(matchedPlatform.gamerTag || "");
      } else {
        setUserPlatform(null);
        setValue("");
      }
    }
  }, [platform.id, userPlatforms]);

  console.log("platform id", platform.id);

  const handleSteamAuth = async () => {
    if (userGuid != undefined) {
      window.location.href = `${
        import.meta.env.VITE_URL
      }/Steam/auth/${userGuid}`;
    }
  };

  return (
    <>
      {isVisible == false && searched == false && userPlatform && (
        <h3 className="ml-4 text-xl font-sans">{userPlatform.gamerTag}</h3>
      )}

      <input
        type="text"
        onChange={(e) => useHandleTyping(e, setValue)}
        value={value}
        className={`${
          !isVisible || searched ? "hidden" : ""
        } rounded ml-4 text-black`}
      />

      <p
        role="button"
        className={`text-teal-400 underline underline-offset-2 ms-5 ${
          isVisible || searched ? "hidden" : ""
        }  ${!userPlatform ? "hidden" : ""} mt-1`}
        onClick={() => setIsVisible(!isVisible)}
      >
        edit
      </p>

      {!searched && (
        <RemoveButton userPlatform={userPlatform} isVisible={isVisible} />
      )}

      {platform.id == 7 && userPlatform && (
        <SyncButton
          userPlatform={userPlatform}
          searched={searched}
          isVisible={isVisible}
          userId={userGuid}
          accountId={userPlatform.externalPlatformId}
        />
      )}

      {platform.id == 163 && userPlatform && (
        <SteamSyncButton
          userPlatform={userPlatform}
          searched={searched}
          isVisible={isVisible}
          userId={userGuid}
          accountId={userPlatform.externalPlatformId}
        />
      )}

      {userPlatform ? (
        <UpdateButton
          userPlatform={userPlatform}
          value={value}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSearched={() => setSearched(!searched)}
        />
      ) : (
        <AddButton
          platform={platform}
          userPlatform={userPlatform}
          userGuid={userGuid}
          value={value}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSearched={() => setSearched(!searched)}
        />
      )}

      {userPlatforms &&
        userPlatforms.filter((x) => x.platformId == platform.id).length <= 0 &&
        (platform.id != 163 ? (
          <p
            role="button"
            onClick={() => setIsVisible(!isVisible)}
            className={`ml-4 text-teal-400 underline underline-offset-2 ${
              isVisible ? "hidden" : ""
            } ${userPlatform || searched ? "hidden" : ""} mt-2`}
          >
            Add a Gamertag for{platform.name}
          </p>
        ) : (
          <p
            role="button"
            onClick={handleSteamAuth}
            className={`ml-4 text-teal-400 underline underline-offset-2 ${
              isVisible ? "hidden" : ""
            } ${userPlatform || searched ? "hidden" : ""} mt-2`}
          >
            Authenticate with {platform.name}
          </p>
        ))}
    </>
  );
};

export default Input;
