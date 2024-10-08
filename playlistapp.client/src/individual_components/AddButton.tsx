import { PlatformGameContextInterface } from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/addUserGameRequest";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserGameContextInterface } from "@/@types/usergame";
import { Plus } from "@/assets/ViewGameSVGs/plus";
import { BorderBeam } from "@/components/ui/border-beam";
import { PlatformGameContext } from "@/contexts/PlatformGameContext";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserGameContext } from "@/contexts/UserGameContext";
import React, { useEffect } from "react";
import { useState } from "react";

interface props {
  gameId: string | undefined;
}

const AddButton: React.FC<props> = ({ gameId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { platformGames, mutatePlatformGames } = React.useContext(
    PlatformGameContext
  ) as PlatformGameContextInterface;

  const { AddUserGame } = React.useContext(
    UserGameContext
  ) as UserGameContextInterface;

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const [addUserGameRequest, setAddUserGameRequest] =
    useState<AddUserGameRequest>();

  useEffect(() => {
    if (platformGames && usr && gameId) {
      const platformGame = platformGames.find(
        (x) => x && x.game.id && x.game.id === Number(gameId)
      );
      if (platformGame && usr.guid) {
        setAddUserGameRequest({
          userId: usr.guid,
          platformGameId: platformGame.id,
        });
      }
    }
  }, [platformGames, usr, gameId]);

  useEffect(() => {
    mutatePlatformGames();
  }, [gameId]);

  return (
    <button
      className="flex flex-row lg:mx-28 mx-12 md:my-8 my-2"
      onClick={() => addUserGameRequest && AddUserGame(addUserGameRequest)}
      disabled={!addUserGameRequest}
    >
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
          <BorderBeam borderWidth={5} duration={2} className="rounded-lg" />
        )}
      </div>
    </button>
  );
};

export default AddButton;
