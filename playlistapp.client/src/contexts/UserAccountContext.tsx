import React, { FC, ReactNode, useEffect } from "react";
import { UserAccountContextInterface } from "../@types/userAccount";
import { useAuth0 } from "@auth0/auth0-react";
import useSessionStorage from "@/hooks/useSessionStorage";
import { UserAccountQueries } from "@/queries/UserAccountQueries";

export const UserAccountContext =
  React.createContext<UserAccountContextInterface | null>(null);

export const UserAccountContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [storedUserGuid, setStoredUserGuid] = useSessionStorage<
    string | undefined
  >("userGuid", undefined);

  const { data, isLoading, error } = UserAccountQueries.useGetUserByAuthId(
    user?.sub ?? ""
  );
  useEffect(() => {
    if (data && data.guid) {
      setStoredUserGuid(data.guid);
    }
  }, [data, setStoredUserGuid]);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        getAccessTokenSilently().then((token) => {
          localStorage.setItem("authToken", token)
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isAuthenticated]);

  console.log(user)

  return (
    <UserAccountContext.Provider
      value={{
        usr: data,
        userGuid: storedUserGuid,
        error: error?.message,
        isLoading,
        roles: user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        isAuthenticated,
      }}
    >
      {children}
    </UserAccountContext.Provider>
  );
};
