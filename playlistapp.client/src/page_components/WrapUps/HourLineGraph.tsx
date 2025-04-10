import { Graph } from "@/@types/WrapUps/Graph";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  Tooltip,
  AreaChart,
  Label,
} from "recharts";

interface HourLineGraphProps {
  graphData: Graph;
}

const HourLineGraph: React.FC<HourLineGraphProps> = ({ graphData }) => {
  if (!graphData) {
    return <></>;
  }
  return (
    <>
      <p className="text-lg font-semibold text-center mb-3">
        {graphData.title}
      </p>
      <div className="md:w-3/4 xl:w-1/2 lg:w-3/4 pb-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={graphData.graphDataPoints}
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
            <XAxis dataKey="dateNumber">
              <Label
                value={graphData.x_Axis.toString()}
                offset={-3}
                position={"bottom"}
              />
            </XAxis>
            <YAxis
              axisLine={false}
              label={{
                value: graphData.y_Axis,
                angle: -90,
                position: "left",
                offset: 10,
              }}
            >
              <Label value={graphData.y_Axis.toString()} angle={-90} />
            </YAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hours"
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
