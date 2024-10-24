import { useAuth0 } from "@auth0/auth0-react";
import UserPFP from "../assets/user.svg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import LogoutButton from "./logout";
import { Link } from "react-router-dom";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import React from "react";

const Profile: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    usr && (
      <div className="lg:w-[213.69px] flex justify-end relative z-20">
        <div className="flex flex-row flex-shrink-0 h-14 w-14">
          <Menu placement="bottom-start">
            <MenuHandler>
              <img
                src={usr.profileURL!}
                alt={usr.username}
                className="rounded-full border-2 border-clay-700 bg-clay-600"
              />
            </MenuHandler>
            <MenuList
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <MenuItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Welcome back, {usr.username}!
              </MenuItem>

              <hr className="my-3" />
              <Link to="/account" reloadDocument>
                <MenuItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="font-bold"
                >
                  Account
                </MenuItem>
              </Link>

              <hr className="my-3" />
              <MenuItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="font-bold"
              >
                My Library
              </MenuItem>

              <hr className="my-3" />
              <MenuItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="font-bold"
              >
                Settings
              </MenuItem>

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
