import { WrapUpHourBarGraph } from "@/@types/WrapUps/WrapUpHourBarGraph";
import React, { useState } from "react";

interface HourBarChartProps {
  HourBarChartData: WrapUpHourBarGraph[] | undefined;
}

const HourBarChart: React.FC<HourBarChartProps> = ({ HourBarChartData }) => {
  if (!HourBarChartData) {
    return <></>;
  }
  const maxValue = Math.max(
    ...HourBarChartData!.map((item) => item.timePlayed)
  );
  const [numRows, setNumRows] = useState<number>(5);

  const increaseNumRows = () => {
    setNumRows(numRows + 5);
  };

  return (
    <div className="bg-gray-100 p-5 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center w-3/4">
      {HourBarChartData!.slice(0, numRows).map((x, key) => (
        <div key={key} className="flex flex-row">
          <div className="px-3 my-2 w-1/5">
            <div>{x.gameTitle}</div>
          </div>
          <div
            className="bg-blue-500 m-1 rounded-sm text-end"
            style={{ width: `${(x.timePlayed / maxValue) * 100 - 1}%` }}
          >
            <span className="text-white text-xs p-1">{x.timePlayed}</span>
          </div>
        </div>
      ))}
      {HourBarChartData!.length > numRows && (
        <div className="text-center font-sans hover:cursor-pointer">
          <p onClick={increaseNumRows}>more...</p>
        </div>
      )}
    </div>
  );
};

export default HourBarChart;
