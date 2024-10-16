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

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="lg:w-[213.69px] flex justify-end relative z-20">
        <div className="flex flex-row flex-shrink-0 h-14 w-14">
          <Menu placement="bottom-start">
            <MenuHandler>
              <img
                src={user.picture ? user.picture : UserPFP}
                alt={user.name}
                className="rounded-full"
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
                Welcome back, {user.name}!
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
