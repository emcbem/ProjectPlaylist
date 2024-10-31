import { PlatformGame } from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { BorderBeam } from "@/components/ui/border-beam";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { useState } from "react";
import { ListQueries } from "@/hooks/ListQueries";
import loadingDotsGif from "../assets/LoadingIcons/icons8-3-dots.gif";
import AddButtonListMenuItem from "./AddButtonListMenuItem";
import { UserGameQueries } from "@/hooks/UserGameQueries";
import { PlatformGameQueries } from "@/hooks/PlatfromGameQueries";
import { PlatformGameRequest } from "@/@types/Requests/GetRequests/getPlatformGameRequest";

interface props {
  gameId: string | undefined;
}

const AddButton: React.FC<props> = ({ gameId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformGame>();
  const [addUserGameRequest, setAddUserGameRequest] =
    useState<AddUserGameRequest>();
  const [platformGameRequest] = useState<PlatformGameRequest>({
    Filter: "",
    PlatformId: 1,
  });
  // const [platformGames, setPlatformGames] = useState<PlatformGame[]>([]);

  const { usr, userGuid } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { mutateAsync: AddUserGame } =
    UserGameQueries.useAddUserGame(addUserGameRequest);

  const { mutateAsync: mutatePlatformGames } =
    PlatformGameQueries.useGetAllPlatformGames(platformGameRequest);

  const { data: lists, isLoading: listIsLoading } =
    ListQueries.useGetListsByUserId(userGuid ?? "");

  const handleMenuItemClick = async (platformGameId: number) => {
    if (platformGameId && usr && usr.guid) {
      const newAddUserGameRequest: AddUserGameRequest = {
        userId: usr.guid,
        platformGameId: platformGameId,
      };
      setAddUserGameRequest(newAddUserGameRequest);
      await AddUserGame();
    }
  };

  const { data: platformGames } = PlatformGameQueries.useGetAllPlatformGamesByGame(Number(gameId));

  useEffect(() => {
    mutatePlatformGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <button className="my-4">
            <div
              className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start sm:w-44 sm:h-12 w-28 h-8  justify-center space-x-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-end">
                <div className="sm:text-2xl text-base font-extrabold leading-none">
                  Add
                </div>
              </div>
              <div className="relative inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className={`w-[15px] h-[15px] fill-current mb-1`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="text-white"
                    d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                  />
                </svg>
              </div>
              {isHovered && (
                <BorderBeam
                  borderWidth={5}
                  duration={2}
                  className="rounded-lg"
                />
              )}
            </div>
          </button>
        </MenuHandler>
        <MenuList>
          <Menu
            placement="right-start"
            open={openMenu}
            handler={setOpenMenu}
            allowHover
            offset={15}
          >
            <MenuHandler className="flex items-center justify-between font-bold">
              <MenuItem>
                {!selectedPlatform
                  ? "Select Platform"
                  : selectedPlatform.platform.name}
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList>
              {platformGames
                ?.filter((x) => x.game.id == Number(gameId))
                .map((x, index) => (
                  <div key={index}>
                    <MenuItem
                      className="font-bold"
                      key={x.platform.id}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setSelectedPlatform(
                          platformGames.find((pGame) => x.id == pGame.id)
                        );
                      }}
                    >
                      {x.platform.name}
                    </MenuItem>
                    {index != platformGames.length - 1 ? (
                      <hr className="my-3" />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </MenuList>
          </Menu>
          <hr className="my-3" />
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className={`font-bold ${
              !selectedPlatform ? "text-gray-500 cursor-default" : ``
            }`}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              selectedPlatform ? handleMenuItemClick(selectedPlatform.id) : "";
            }}
          >
            Add to My Library
          </MenuItem>
          <hr className="my-3" />
          {listIsLoading && (
            <MenuItem
              disabled={true}
              className={`font-bold text-gray-900`}
              onClick={() => {}}
            >
              <img src={loadingDotsGif} width={20} />
            </MenuItem>
          )}
          <AddButtonListMenuItem
            lists={lists}
            gameId={gameId}
            userGuid={userGuid}
          />
        </MenuList>
      </Menu>
    </>
  );
};

export default AddButton;
