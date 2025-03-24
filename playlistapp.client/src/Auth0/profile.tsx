import { useAuth0 } from "@auth0/auth0-react";
import {
  Menu,
  MenuHandler,
  MenuList as MTMenuList,
  MenuItem as MTMenuItem,
} from "@material-tailwind/react";
import LogoutButton from "./logout";
import { Link } from "react-router-dom";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Badge from "@mui/material/Badge";
import LoginButton from "./login";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import { RoleRequired } from "@/page_components/AuthenticationLockers/RoleRequired";

const Profile = () => {
  const { isAuthenticated } = useAuth0();

  const { usr, isLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  if (isLoading) {
    return <LoadingDots />;
  }

  if (!usr && !isAuthenticated) {
    return <LoginButton />;
  }

  const MenuList = (props: any) => <MTMenuList {...props} />;
  const MenuItem = (props: any) => <MTMenuItem {...props} />;

  return (
    isAuthenticated &&
    usr && (
      <div className="flex justify-end relative z-20">
        <Link
          className="justify-center items-center sm:h-14 sm:w-14 h-8 w-8 rounded-full dark:bg-black bg-white border-2 dark:border-clay-950 border-black transition-all cursor-pointer lg:mx-4 lg:flex hidden"
          to="/notifications"
        >
          <Badge badgeContent={usr.notifications.length} color="warning">
            <BellIcon strokeWidth={2.5} className={`h-6 w-6`} />
          </Badge>
        </Link>

        <div className="flex flex-row flex-shrink-0 sm:h-14 sm:w-14 h-11 w-11">
          <Menu placement="bottom-start">
            <MenuHandler>
              <img
                src={usr.profileURL!}
                alt={usr.username}
                className="rounded-full border-2  dark:bg-black bg-white dark:border-clay-950 border-black"
              />
            </MenuHandler>
            <MenuList>
              <Link to="/account">
                <MenuItem className="font-bold">Account</MenuItem>
              </Link>

              <hr className="my-3" />
              <Link to="/library">
                <MenuItem className="font-bold">My Library</MenuItem>
              </Link>

              <hr className="my-3 lg:hidden block" />
              <Link to={"/notifications"}>
                <MenuItem className="font-bold lg:hidden block">
                  Notifications
                </MenuItem>
              </Link>

              <hr className="my-3" />
              <Link to={"/settings"}>
                <MenuItem className="font-bold">Settings</MenuItem>
              </Link>

              <RoleRequired
                roleToLookOutFor="Admin"
                displayIfUnauthorized={true}
              >
                <hr className="my-3" />
                <Link to={"/admin"}>
                  <MenuItem className="font-bold">Admin Page</MenuItem>
                </Link>
              </RoleRequired>
              <hr className="my-3" />
              <LogoutButton />
            </MenuList>
          </Menu>
        </div>
      </div>
    )
  );
};

export default Profile;
