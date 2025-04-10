import React, { useState } from "react";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";

interface DateRangeSelectorProps {
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  setSelectedYear,
  setSelectedMonth,
}) => {
  const [thisSelectedYear, setThisSelectedYear] = useState<number>();
  const [thisSelectedMonth, setThisSelectedMonth] = useState<number>();

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setThisSelectedYear(year);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event);
    setThisSelectedMonth(Number(event.target.value));
  };

  return (
    <div className="flex justify-center font-sans mb-24">
      <div className="bg-gray-100 p-5 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center">
        <div className="text-center flex flex-row space-x-4">
          <MonthSelector
            currentSelectedYear={thisSelectedYear}
            setSelectedMonth={handleMonthChange}
          />
          <YearSelector
            setSelectedYear={handleYearChange}
            currentSelectedMonth={thisSelectedMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
