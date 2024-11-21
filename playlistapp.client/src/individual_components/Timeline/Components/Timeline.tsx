import TimelineItem from "./TimelineItem";

const Timeline = () => {
  // const colors = ["#602B53", "#A43845", "#DE5152", "#EDBD68"];

  return (
    <div className="flex flex-col">
      <TimelineItem text={"Item 1"} lastItem={true} color={"#602B53"} />
      <TimelineItem text={"Item 2"} lastItem={true} color={"#A43845"} />
      <TimelineItem text={"Item 3"} lastItem={false} color={"#EDBD68"} />
    </div>
  );
};

export default Timeline;
