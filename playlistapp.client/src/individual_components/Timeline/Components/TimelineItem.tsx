import { FC } from "react";
import TimelineIcon from "./TimelineIcon";
import TimelineSeperator from "./TimelineSeperator";
import TimelineText from "./TimelineText";

const TimelineItem: FC<{ text: string; lastItem: boolean; color: string }> = ({
  text,
  lastItem,
  color,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row  w-full">
        <div className="flex flex-col items-center justify-start">
          <TimelineIcon color={color} />
          {lastItem && <TimelineSeperator />}
        </div>
        <TimelineText text={text} />
      </div>
    </div>
  );
};

export default TimelineItem;
