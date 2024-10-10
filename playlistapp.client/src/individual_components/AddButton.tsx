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
          <button className="flex flex-row lg:mx-28 mx-12 md:my-8 my-2">
            <div
              className="cursor-pointer relative flex flex-row items-center bg-[#252A2C] dark:bg-[#D9D9D9] dark:text-black text-white rounded-lg text-start sm:p-8 py-5 px-4
            2xl:w-[300px] xl:w-[200px] lg:w-[175px] md:w-[150px] w-fit 
            2xl:h-32 xl:h-24 lg:h-16 md:h-8 h-2
            justify-start md:justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div>
                <div className="2xl:text-3xl xl:text-xl text-lg font-extrabold md:block hidden h-fit">
                  Save to
                </div>
                <div className="2xl:text-5xl xl:text-3xl text-xl font-extrabold h-fit">
                  Playlist
                </div>
              </div>
              <div className="relative inline-block md:ml-4 ml-0">
                <Plus height={50} width={50} />
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
