import { Platform } from "@/@types/platform";
import { UserPlatform } from "@/@types/userPlatform";
import { FC } from "react";
import Input from "./Input";
import { LogoDictonary } from "./LogoDictonary";

interface EditGamerTagFieldProps {
  platform: Platform;
  userPlatforms: UserPlatform[] | undefined;
  userGuid: string;
}

const PlatformList: FC<EditGamerTagFieldProps> = ({
  platform,
  userPlatforms,
  userGuid,
}) => {
  const Logo = LogoDictonary[platform.id] || (() => <div>No Logo</div>);

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="h-8 w-8 mt-1">
        <Logo />
      </div>
      <Input
        platform={platform}
        userPlatforms={userPlatforms ?? []}
        userGuid={userGuid}
      />
    </div>
  );
};

export default PlatformList;
