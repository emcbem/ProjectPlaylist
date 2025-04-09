import { FC } from "react";

interface GameCoverProps {
  coverUrl: string;
  title: string;
}

const GameCover: FC<GameCoverProps> = ({ coverUrl, title }) => {
  return (
    <img
      src={coverUrl.replace(/t_cover_big/g, "t_1080p")}
      className="block aspect-[3/4] max-h-96 object-cover rounded-lg shadow-xl dark:shadow-[#182225]"
      alt={`${title} cover`}
    />
  );
};

export default GameCover;
