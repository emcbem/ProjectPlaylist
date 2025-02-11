import { FC } from "react";

interface IConfirmation {
  handleSubmit: (event: React.FormEvent) => void;
  handleConfirmation: () => void;
}

const Confirmation: FC<IConfirmation> = ({
  handleSubmit,
  handleConfirmation,
}) => {
  return (
    <>
      <h1 className="text-2xl text-red-500">Warning</h1>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-lg text-white">
          By syncing your PSN data, it will import your PSN library's data which
          includes game library and playtime. By doing so, there might be
          collisions you will have to manually resolve. Are you okay with this?
        </label>
      </div>
      <div className={`p-6 pb-0 px-0 flex flex-row w-full`}>
        <button
          onClick={handleSubmit}
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
          Yes!
        </button>
      </div>
    </>
  );
};

export default Confirmation;
