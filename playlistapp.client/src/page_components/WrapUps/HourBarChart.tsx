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

  const filteredSortedData: WrapUpHourBarGraph[] = HourBarChartData.filter(
    (x) => x.timePlayed > 0
  ).sort((a, b) => b.timePlayed - a.timePlayed);
  return (
    <div className="bg-gray-100 p-5 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center md:w-3/4 lg:w-1/2">
      {filteredSortedData.slice(0, numRows).map((x, key) => (
        <div key={key} className="flex flex-row">
          <div className="px-3 my-2 w-1/4 truncate me-6 text-left">
            <div>{x.gameTitle}</div>
          </div>
          <div className="w-3/4">
            <div
              className="bg-sky-600 m-1 rounded-sm text-end"
              style={{ width: `${(x.timePlayed / maxValue) * 100}%` }}
            >
              <span className="text-white text-sm font-semibold font-sans p-1">
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
