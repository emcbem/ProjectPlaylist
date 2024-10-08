import { Game } from "@/@types/game";
import React from "react";

interface props {
  Game: Game | undefined;
}

const GameImageBackground: React.FC<props> = ({ Game }) => {
  return (
    <div className="relative flex justify-center top-0 h-screen mt-[-6rem]">
      <img
        src={Game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
        className={"object-cover object-top z-0 w-full h-full image-gradient"}
      />
    </div>
  );
};

export default GameImageBackground;
