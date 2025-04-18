import { useUserContext } from "@/hooks/useUserContext";
import { ReactNode } from "react";

export const RoleRequired = ({
  children,
  roleToLookOutFor,
  displayIfUnauthorized = false,
}: {
  roleToLookOutFor: string;
  displayIfUnauthorized?: boolean;
  children: ReactNode;
}) => {
  var userContext = useUserContext();

  if (!userContext?.isAuthenticated) {
    return displayIfUnauthorized ? <div>Please log in</div> : null;
  }


  if (!userContext?.roles || !userContext.roles.includes(roleToLookOutFor)) {
    return displayIfUnauthorized ? (
      <>
        <div>Insufficient Privileges</div>
        {userContext.roles?.map((userRole, index) => (
          <p key={index}>{userRole}</p>
        ))}
      </>
    ) : null;
  }

  return <>{children}</>;
};
