import { useUserContext } from "@/hooks/useUserContext";
import LoadingPage from "@/individual_components/LoadingPage";
import { ReactNode } from "react";

export const RoleRequired = ({
  children,
  role,
  displayIfUnauthorized,
}: {
  children: ReactNode;
  role: string;
  displayIfUnauthorized: boolean;
}) => {
  var userContext = useUserContext();

  if (!userContext?.isAuthenticated) {
    return displayIfUnauthorized ? <div>Please log in</div> : null;
  }

  console.log(userContext.roles?.[0]);

  if (!userContext?.roles || !userContext.roles.includes(role)) {
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
