import {
  PlatformGame,
  PlatformGameContextInterface,
} from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserGameContextInterface } from "@/@types/usergame";
import { PlatformGameService } from "@/ApiServices/PlatformGameService";
import { Plus } from "@/assets/ViewGameSVGs/plus";
import { BorderBeam } from "@/components/ui/border-beam";
import { PlatformGameContext } from "@/contexts/PlatformGameContext";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserGameContext } from "@/contexts/UserGameContext";
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
import loadingDotsGif from '../assets/LoadingIcons/icons8-3-dots.gif';
import AddButtonListMenuItem from "./AddButtonListMenuItem";


interface props {
  gameId: string | undefined;
}

const AddButton: React.FC<props> = ({ gameId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformGame>();

  const { mutatePlatformGames } = React.useContext(
    PlatformGameContext
  ) as PlatformGameContextInterface;

  const { AddUserGame } = React.useContext(
    UserGameContext
  ) as UserGameContextInterface;

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const { data: lists, isLoading: listIsLoading } = ListQueries.useGetListsByUserId(usr?.guid ?? "");


  const handleMenuItemClick = async (platformId: number) => {
    if (usr) {
      if (platformId && usr.guid) {
        const newAddUserGameRequest: AddUserGameRequest = {
          userId: usr.guid,
          platformGameId: platformId,
        };
        await AddUserGame(newAddUserGameRequest);
      }
    }
  };


  const [platformGames, setPlatformGames] = useState<PlatformGame[]>([]);

  useEffect(() => {
    PlatformGameService.GetAllPlatfromGamesByGameId(Number(gameId)).then(
      (x) => {
        setPlatformGames(x ?? []);
      }
    );
  }, []);

  useEffect(() => {
    mutatePlatformGames({
      filter: "",
      platformID: 1,
    });
  }, []);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <button className="my-4">
            <div
              className="cursor-pointer relative flex flex-row items-center bg-clay-200 dark:bg-clay-600 dark:text-white text-white rounded-lg text-start 
            2xl:w-44 w-fit 
            md:h-12 h-2
            justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div>
                {/* <div className="2xl:text-3xl xl:text-xl text-lg font-extrabold md:block hidden h-fit">
                  Save to
                </div> */}
                <div className="2xl:text-2xl xl:text-3xl text-xl font-extrabold h-fit">
                  Add
                </div>
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
                  className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-90" : ""
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
                  <div key={x.platformId}>
                    <MenuItem
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="font-bold"
                      key={x.platformId}
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
            className={`font-bold ${!selectedPlatform ? "text-gray-500 cursor-default" : ``
              }`}
            onClick={() => {
              selectedPlatform ? handleMenuItemClick(selectedPlatform.id) : "";
            }}
          >
            Add to My Library
          </MenuItem>
          <hr className="my-3" />
          {listIsLoading && <MenuItem
            disabled={true}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className={`font-bold text-gray-900`}
            onClick={() => { }}
          >
            <img src={loadingDotsGif} width={20} />
          </MenuItem>}
          <AddButtonListMenuItem lists={lists} gameId={gameId} userGuid={usr?.guid} />
        </MenuList>
      </Menu>
    </>
  );
};

export default AddButton;
