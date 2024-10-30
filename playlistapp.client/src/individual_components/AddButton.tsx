import { PlatformGame } from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { PlatformGameService } from "@/ApiServices/PlatformGameService";
import { Plus } from "@/assets/ViewGameSVGs/plus";
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
  const [platformGames, setPlatformGames] = useState<PlatformGame[]>([]);

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

  useEffect(() => {
    PlatformGameService.GetAllPlatfromGamesByGameId(Number(gameId)).then(
      (x) => {
        setPlatformGames(x ?? []);
      }
    );
  }, []);

  useEffect(() => {
    mutatePlatformGames();
  }, []);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <button className="my-4">
            <div
              className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start w-44 h-12 justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div>
                <div className="text-2xl font-extrabold h-fit">Add</div>
              </div>
              <div className="relative inline-block">
                <Plus height={20} width={20} />
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
        <MenuList
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Menu
            placement="right-start"
            open={openMenu}
            handler={setOpenMenu}
            allowHover
            offset={15}
          >
            <MenuHandler className="flex items-center justify-between font-bold">
              <MenuItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
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
            <MenuList
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {platformGames
                .filter((x) => x.game.id == Number(gameId))
                .map((x, index) => (
                  <div key={index}>
                    <MenuItem
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="font-bold"
                      key={x.platform.id}
                      onClick={() => {
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
              selectedPlatform ? handleMenuItemClick(selectedPlatform.id) : "";
            }}
          >
            Add to My Library
          </MenuItem>
          <hr className="my-3" />
          {listIsLoading && (
            <MenuItem
              disabled={true}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
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
