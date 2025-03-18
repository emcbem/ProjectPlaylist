import { FC } from "react";

interface IConfirmation {
  handleRejectSync: (event: React.FormEvent) => void;
  handleConfirmation: () => void;
  platformName: string;
}

const Confirmation: FC<IConfirmation> = ({
  handleRejectSync,
  handleConfirmation,
  platformName,
}) => {
  return (
    <>
      <h1 className="text-2xl text-red-500">Warning</h1>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-lg text-white">
          By syncing your {platformName} data, it will import your{" "}
          {platformName} library's data which includes game library and
          playtime. This can only be done if your game data in your account is
          public to be viewed by anyone. By doing so, there might be collisions
          you will have to manually resolve. Are you okay with this?
        </label>
      </div>
      <div className={`p-6 pb-0 px-0 flex flex-row w-full`}>
        <button
          onClick={handleRejectSync}
          className="w-full rounded-md bg-red-500 py-2 px-4 text-sm m-2 text-white"
          type="submit"
        >
          No thank you.
        </button>
        <button
          onClick={handleConfirmation}
          className="w-full rounded-md bg-green-500 py-2 px-4 text-sm m-2 text-white"
          type="submit"
        >
          Yes, sync with {platformName}!
        </button>
      </div>
    </>
  );
};

export default Confirmation;
