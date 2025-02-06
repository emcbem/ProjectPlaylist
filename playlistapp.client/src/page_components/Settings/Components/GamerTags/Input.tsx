import { Platform } from "@/@types/platform";
import { UserPlatform } from "@/@types/userPlatform";
import { FC, useEffect, useState } from "react";
import { useHandleTyping } from "../../Hooks/useHandleTyping";
import UpdateButton from "./UpdateButton";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import SyncButton from "./SyncButton";

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

      {platform.id == 7 && (
        <SyncButton
          userPlatform={userPlatform}
          searched={searched}
          isVisible={isVisible}
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
          userGuid={userGuid}
          value={value}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSearched={() => setSearched(!searched)}
        />
      )}

      {userPlatforms &&
        userPlatforms.filter((x) => x.platformId == platform.id).length <=
          0 && (
          <p
            role="button"
            onClick={() => setIsVisible(!isVisible)}
            className={`ml-4 text-teal-400 underline underline-offset-2 ${
              isVisible ? "hidden" : ""
            } ${userPlatform || searched ? "hidden" : ""} mt-2`}
          >
            Add a Gamertag for {platform.name}
          </p>
        )}
    </>
  );
};

export default Input;
