import { WrapUpHourBarGraph } from "@/@types/WrapUps/WrapUpHourBarGraph";
import React, { useState } from "react";

// Define the type for our data
type ChartData = {
  name: string;
  value: number;
};

// Sample data for the chart
const data: ChartData[] = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 300 },
  { name: "Page C", value: 200 },
  { name: "Page D", value: 278 },
  { name: "Page E", value: 189 },
  { name: "Page F", value: 65 },
  { name: "Page G", value: 80 },
  { name: "Page H", value: 34 },
  { name: "Page I", value: 92 },
  { name: "Page J", value: 57 },
  { name: "Page K", value: 19 },
  { name: "Page L", value: 83 },
  { name: "Page M", value: 47 },
  { name: "Page N", value: 68 },
  { name: "Page O", value: 28 },
  { name: "Page P", value: 55 },
  { name: "Page Q", value: 72 },
  { name: "Page R", value: 90 },
  { name: "Page S", value: 62 },
  { name: "Page T", value: 36 },
];

interface HourBarChartProps {
  HourBarChartData: WrapUpHourBarGraph[] | undefined;
}

const HourBarChart: React.FC<HourBarChartProps> = ({ HourBarChartData }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const [numRows, setNumRows] = useState<number>(5);
  console.log(HourBarChartData);

  const increaseNumRows = () => {
    setNumRows(numRows + 5);
  };

  return (
    <div className="bg-gray-100 p-5 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center w-3/4">
      {data.slice(0, numRows).map((x, key) => (
        <div key={key} className="flex flex-row">
          <div className="px-3 my-2 w-1/5">
            <div>{x.name}</div>
          </div>
          <div
            className="bg-blue-500 m-1 rounded-sm text-end"
            style={{ width: `${(x.value / maxValue) * 100 - 1}%` }}
          >
            <span className="text-white text-xs p-1">{x.value}</span>
          </div>
        </div>
      ))}
      {data.length > numRows && (
        <div className="text-center font-sans hover:cursor-pointer">
          <p onClick={increaseNumRows}>more...</p>
        </div>
      )}
    </div>
  );
};

export default HourBarChart;
