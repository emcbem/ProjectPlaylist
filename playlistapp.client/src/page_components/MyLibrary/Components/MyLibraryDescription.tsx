import { UserGame } from "@/@types/usergame";
import formatDate from "@/lib/date";
import AddGoalButton from "@/page_components/Goals/Components/Buttons/AddGoalButton";
import { FC } from "react";

interface props {
  userGame: UserGame;
}

const MyLibraryDescription: FC<props> = ({ userGame }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div>
            <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl sm:text-2xl text-base">
              {userGame?.platformGame.game?.title}
            </h1>
            <p className="text-clay-950 dark:text-clay-900"></p>
            <p className="text-clay-950 dark:text-clay-900">
              {userGame?.platformGame.platform.name} -&nbsp;
              {userGame?.platformGame.game?.companies[0].name}{" "}
              -&nbsp;Released&nbsp;
              {userGame?.platformGame.game?.publishDate
                ? formatDate(new Date(userGame?.platformGame.game.publishDate))
                : "No publish date"}
            </p>
          </div>
          <AddGoalButton />
        </div>
      </div>

      <h1 className="dark:text-white text-black sm:text-base text-tiny line-clamp-3 my-3 ">
        {userGame?.platformGame.game?.description}
      </h1>
    </div>
  );
};

export default MyLibraryDescription;