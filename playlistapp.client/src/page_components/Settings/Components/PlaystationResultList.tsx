import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import { FC } from "react";
import PlaystationResult from "./PlaystationResult";

const PlaystationResultList: FC<{
  display: boolean;
  PlaystationUserResults: PlaystationUser[];
  setSearchAgain: () => void;
  selectedPSUser: PlaystationUser | undefined;
  setSelectedPSUser: (user: PlaystationUser) => void;
  handleSave: () => void;
}> = ({
  display,
  PlaystationUserResults,
  setSearchAgain,
  selectedPSUser,
  setSelectedPSUser,
  handleSave,
}) => {
  console.log("THRR", display);
  return (
    <div className={`ml-2 pb-4  ${display ? "" : "hidden"}`}>
      <h1 className="ml-2 text-xl">Results</h1>
      <div className="flex flex-wrap w-full">
        {PlaystationUserResults.map((p, i) => (
          <PlaystationResult
            PlaystationUser={p}
            key={i}
            selectedPSUser={selectedPSUser}
            setSelectedPSUser={setSelectedPSUser}
          />
        ))}
        {selectedPSUser && (
          <button
            onClick={handleSave}
            className={` bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent transition-all rounded-full inline-block m-2`}
          >
            Set Account
          </button>
        )}

        <button
          onClick={setSearchAgain}
          className={` bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent transition-all rounded-full inline-block m-2`}
        >
          Search Again
        </button>
      </div>
    </div>
  );
};

export default PlaystationResultList;
