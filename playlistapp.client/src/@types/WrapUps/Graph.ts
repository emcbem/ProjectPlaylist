import { HourGraphDataPoint } from "./HourGraphDataPoint";

export interface Graph {
  title: string;
  x_Axis: string[];
  y_Axis: string[];
  graphDataPoints: HourGraphDataPoint[];
}
