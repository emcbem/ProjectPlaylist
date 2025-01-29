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

const Profile: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const MenuList = (props: any) => <MTMenuList {...props} />;
  const MenuItem = (props: any) => <MTMenuItem {...props} />;

  return (
    isAuthenticated &&
    usr && (
      <div className="flex justify-end relative z-20">
        <Link
          className="flex justify-center items-center sm:h-14 sm:w-14 h-8 w-8 rounded-full bg-clay-400 transition-all cursor-pointer lg:mx-4"
          to="/notifications"
        >
          <Badge badgeContent={usr.notifications.length} color="warning">
            <BellIcon strokeWidth={2.5} className={`h-6 w-6`} />
          </Badge>
        </Link>

        <div className="flex flex-row flex-shrink-0 sm:h-14 sm:w-14 h-8 w-8">
          <Menu placement="bottom-start">
            <MenuHandler>
              <img
                src={usr.profileURL!}
                alt={usr.username}
                className="rounded-full border-2 border-clay-700 bg-clay-600"
              />
            </MenuHandler>
            <MenuList>
              <Link to="/account" reloadDocument>
                <MenuItem className="font-bold">Account</MenuItem>
              </Link>

              <hr className="my-3" />
              <Link to="/library" reloadDocument>
                <MenuItem className="font-bold">My Library</MenuItem>
              </Link>

              <hr className="my-3" />
              <Link to={"/settings"}>
                <MenuItem className="font-bold">Settings</MenuItem>
              </Link>

              <hr className="my-3" />
              <Link to={"/admin"}>
                <MenuItem className="font-bold">Admin Page</MenuItem>
              </Link>

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
