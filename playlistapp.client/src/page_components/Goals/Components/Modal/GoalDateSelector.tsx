import DateSelector from "@/individual_components/DateSelector";
import { FC } from "react";

interface props {
  month: string;
  day: string;
  year: string;
  setMonth: (value: string) => void;
  setDay: (value: string) => void;
  setYear: (value: string) => void;
}

const GoalDateSelector: FC<props> = ({
  month,
  day,
  year,
  setDay,
  setMonth,
  setYear,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-black text-center">
          What date do you want to achieve this by?
        </label>
        <div className="flex justify-center">
          <div className="w-fit">
            <DateSelector
              month={month}
              day={day}
              year={year}
              setMonth={setMonth}
              setDay={setDay}
              setYear={setYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDateSelector;
