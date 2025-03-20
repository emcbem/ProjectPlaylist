import { useUserContext } from "@/hooks/useUserContext";
import LoadingPage from "@/individual_components/LoadingPage";
import { ReactNode } from "react";

export const RoleRequired = ({
  children,
  roleToLookOutFor,
  displayIfUnauthorized,
}: {
    roleToLookOutFor: string;
    displayIfUnauthorized: boolean;
  children: ReactNode;
}) => {
  var userContext = useUserContext();

  if (!userContext?.isAuthenticated) {
    return displayIfUnauthorized ? <div>Please log in</div> : null;
  }

  console.log(userContext.roles?.[0]);
  console.log(`role to look out for ${roleToLookOutFor}`)

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
