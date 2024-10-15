import {
  PlatformGame,
  PlatformGameContextInterface,
} from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/addUserGameRequest";
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
import React, { useEffect } from "react";
import { useState } from "react";

interface props {
  gameId: string | undefined;
}

const AddButton: React.FC<props> = ({ gameId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { mutatePlatformGames } = React.useContext(
    PlatformGameContext
  ) as PlatformGameContextInterface;

  const { AddUserGame } = React.useContext(
    UserGameContext
  ) as UserGameContextInterface;

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const handleMenuItemClick = async (platformId: number) => {
    console.log("Adding user game of platform id: ", platformId);
    if (usr) {
      if (platformId && usr.guid) {
        const newAddUserGameRequest: AddUserGameRequest = {
          userId: usr.guid,
          platformGameId: platformId,
        };

        console.log("request", newAddUserGameRequest);

        await AddUserGame(newAddUserGameRequest);
      }
    }
  };

const [platformGames, setPlatformGames] = useState<PlatformGame[]>([])

useEffect(()=>
{
  PlatformGameService.GetAllPlatfromGamesByGameId(Number(gameId)).then(x => {setPlatformGames(x?? [])})
}, [])


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
              className="cursor-pointer relative flex flex-row items-center bg-[#252A2C] dark:bg-[#D9D9D9] dark:text-black text-white rounded-lg text-start 
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
                  Library
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
          {platformGames
            .filter((x) => x.game.id == Number(gameId))
            .map((x) => (
              <>
                <MenuItem
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="font-bold"
                  key={x.platformId}
                  onClick={() => {
                    handleMenuItemClick(x.id);
                  }}
                >
                  {x.platform.name}
                </MenuItem>
                <hr className="my-3" />
              </>
            ))}

          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="font-bold"
          >
            Wishlist
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default AddButton;
