import Button from "./Button";

const PSNUpdate = () => {
  return (
    <div className="md:w-1/4 w-2/4 lg:ml-12 lg:mx-0 mx-12">
      <h1 className="md:text-3xl text-xl mt-8">Refresh PSN Key</h1>
      <hr className="h-px my-4 bg-black border-0 dark:bg-white" />
      <Button message="Refresh" />
    </div>
  );
};

export default PSNUpdate;
