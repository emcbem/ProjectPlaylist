import Button from "./Button";

const IGBDUpdate = () => {
  return (
    <div className="md:w-1/4 w-2/4 lg:mr-12 lg:mx-0 mx-12">
      <h1 className="md:text-3xl text-xl mt-8"> Update IGDB Dataset</h1>
      <hr className="h-px my-4 bg-black border-0 dark:bg-white" />
      <Button message="Update" />
    </div>
  );
};

export default IGBDUpdate;
