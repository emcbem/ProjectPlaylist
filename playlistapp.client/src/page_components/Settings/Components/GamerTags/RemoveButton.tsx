import { UserPlatform } from "@/@types/userPlatform";
import { useUserContext } from "@/hooks/useUserContext";
import { UserPlatformQueries } from "@/queries/UserPlatformQueries";

const RemoveButton = ({
  userPlatform,
  isVisible,
}: {
  userPlatform: UserPlatform | null;
  isVisible: boolean;
}) => {
  const userData = useUserContext();
  const { mutateAsync: deleteUserPlatform } =
    UserPlatformQueries.DeleteUserPlatform(userData?.userGuid ?? "");

  const handleRemove = async () => {
    if (userPlatform != undefined) {
      await deleteUserPlatform(userPlatform?.id);
    } else {
      console.error("User platform id was undefined");
    }
  };

  return (
    <p
      role="button"
      className={`text-teal-400 underline underline-offset-2 ms-5 ${
        isVisible ? "hidden" : ""
      }  ${!userPlatform ? "hidden" : ""} mt-1`}
      onClick={handleRemove}
    >
      remove
    </p>
  );
};

export default RemoveButton;
