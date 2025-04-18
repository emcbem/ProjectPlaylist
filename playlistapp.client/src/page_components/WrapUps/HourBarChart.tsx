import { WrapUpHourBarGraph } from "@/@types/WrapUps/WrapUpHourBarGraph";
import React, { useState } from "react";

interface HourBarChartProps {
  HourBarChartData: WrapUpHourBarGraph[] | undefined;
  userName: string;
}

const HourBarChart: React.FC<HourBarChartProps> = ({ HourBarChartData, userName }) => {
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

  const filteredSortedData: WrapUpHourBarGraph[] = HourBarChartData.filter(
    (x) => x.timePlayed > 0
  ).sort((a, b) => b.timePlayed - a.timePlayed);

  return (
    <div className="bg-gray-100 py-12 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center mb-20 md:w-3/4 xl:w-1/2 lg:w-3/4">
      {filteredSortedData.length <= 0 && (
        <p>
          {userName} had no hours.
          <br />
          Try a different time frame.
        </p>
      )}
      {filteredSortedData.slice(0, numRows).map((x, key) => (
        <div key={key} className="flex flex-row">
          <div className="px-3 my-2 w-1/4 truncate text-ellipsis me-6 text-left">
            <div>{x.gameTitle}</div>
          </div>
          <div className="w-3/4">
            <div
              className="bg-cyan-500 m-1 rounded-sm text-end"
              style={{ width: `${(x.timePlayed / maxValue) * 100}%` }}
            >
              <span className="dark:text-white text-black text-sm font-semibold font-sans p-1">
                {x.timePlayed}
              </span>
            </div>
          </div>
        </div>
      ))}
      {filteredSortedData!.length > numRows && (
        <div className="font-semibold text-center font-sans hover:cursor-pointer underline underline-offset-2">
          <p onClick={increaseNumRows}>
            {filteredSortedData.length -
              filteredSortedData!.slice(0, numRows).length}{" "}
            more...
          </p>
        </div>
      )}
    </div>
  );
};

export default HourBarChart;
