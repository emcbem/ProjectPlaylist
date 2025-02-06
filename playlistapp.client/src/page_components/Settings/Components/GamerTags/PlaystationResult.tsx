import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import { FC } from "react";

const PlaystationResult: FC<{
  PlaystationUser: PlaystationUser;
  selectedPSUser: PlaystationUser | undefined;
  setSelectedPSUser: (user: PlaystationUser) => void;
}> = ({ PlaystationUser, selectedPSUser, setSelectedPSUser }) => {
  const isSelected = selectedPSUser?.accountId === PlaystationUser.accountId;
  return (
    <div
      className={`rounded-full w-fit dark:text-white text-black flex flex-row items-center border dark:border-white border-[#00439c] hover:bg-[#00439c] hover:text-white transition-all cursor-pointer m-2 ${
        isSelected ? "bg-[#00439c] text-white" : ""
      }`}
      onClick={() => setSelectedPSUser(PlaystationUser)}
    >
      <img
        src={PlaystationUser.avatarUrl}
        className="rounded-full bg-[#ebebeb] h-11 w-11 m-2"
      />

      <svg
        width={20}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0.78 4 22 17"
        className="transition-colors duration-300 fill-current group-hover:fill-[#FFFFFF]"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M22.584 17.011c-.43.543-1.482.93-1.482.93l-7.833 2.817V18.68l5.764-2.057c.655-.234.755-.566.223-.74-.53-.175-1.491-.125-2.146.111l-3.84 1.354v-2.155l.22-.075s1.11-.394 2.671-.567c1.56-.172 3.472.024 4.972.593 1.69.535 1.88 1.323 1.451 1.866zm-8.57-3.537V8.162c0-.624-.114-1.198-.699-1.36-.447-.144-.725.272-.725.895V21l-3.584-1.139V4c1.524.283 3.744.953 4.937 1.355 3.035 1.043 4.064 2.342 4.064 5.267 0 2.851-1.758 3.932-3.992 2.852zm-11.583 4.99c-1.735-.49-2.024-1.51-1.233-2.097.731-.542 1.974-.95 1.974-.95l5.138-1.83v2.086l-3.697 1.325c-.653.234-.754.566-.223.74.531.175 1.493.125 2.147-.11l1.773-.644v1.865l-.353.06c-1.774.29-3.664.169-5.526-.445z" />
      </svg>
      <h1 className="font-SST m-2">{PlaystationUser.onlineId}</h1>
    </div>
  );
};

export default PlaystationResult;
