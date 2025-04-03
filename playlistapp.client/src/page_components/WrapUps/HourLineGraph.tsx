import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  Tooltip,
  AreaChart,
} from "recharts";

const data = [
  { x_ticks: "1", hours: 5000, gameId: 9 },
  { month: "2", savings: 8000 },
  { month: "3", savings: 3000 },
  { month: "4", savings: 0 },
  { month: "5", savings: 4234 },
  { month: "6", savings: 153 },
  { month: "7", savings: 476 },
  { month: "8", savings: 4567 },
  { month: "9", savings: 342 },
  { month: "10", savings: 0 },
  { month: "11", savings: 874 },
  { month: "12", savings: 1235 },
  { month: "13", savings: 8756 },
  { month: "14", savings: 320 },
  { month: "15", savings: 3450 },
  { month: "16", savings: 560 },
  { month: "17", savings: 0 },
  { month: "18", savings: 0 },
  { month: "19", savings: 0 },
  { month: "20", savings: 450 },
  { month: "21", savings: 4320 },
  { month: "22", savings: 570 },
  { month: "23", savings: 0 },
  { month: "24", savings: 0 },
  { month: "25", savings: 2340 },
  { month: "26", savings: 420 },
  { month: "27", savings: 3460 },
  { month: "28", savings: 40 },
  { month: "29", savings: 210 },
  { month: "30", savings: 0 },
  { month: "31", savings: 0 },
];

const HourLineGraph = () => {
  return (
    <>
      <p className="text-lg font-semibold text-center mb-3">Hours</p>
      <div className="md:w-3/4 xl:w-1/2 lg:w-3/4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#00b8db" stopOpacity={1} />
                <stop offset="90%" stopColor="teal" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="none"
              stroke="gray"
              strokeWidth={0.5}
              vertical={false}
            />
            <XAxis dataKey="month" />
            <YAxis axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="teal"
              fill="url(#colorSavings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default HourLineGraph;
