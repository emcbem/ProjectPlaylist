import { FC } from "react";

const TimelineText: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="ml-2 mt-4">
      <h1 className="text-left">{text}</h1>
    </div>
  );
};

export default TimelineText;
