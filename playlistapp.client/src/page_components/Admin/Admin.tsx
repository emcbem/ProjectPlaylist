import { RoleRequired } from "../AuthenticationLockers/RoleRequired";
import IGBDUpdate from "./Components/IGDBUpdate.tsx/IGBDUpdate";
import PSNUpdate from "./Components/PSNUpdate";

const AdminPage = () => {
  return (
    <RoleRequired roleToLookOutFor={"Admin"}>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full max-w-[1264px] dark:text-white text-black justify-start items-start mt-14">
          <div className="w-full flex lg:justify-start justify-center">
            <h1 className="text-4xl font-bold ">Admin Page</h1>
          </div>
          <div className="w-full my-3 flex lg:flex-row flex-col">
            <IGBDUpdate />
            <PSNUpdate />
          </div>
        </div>
      </div>
    </RoleRequired>
  );
};

export default AdminPage;
