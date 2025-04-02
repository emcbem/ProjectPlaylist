import React, { useState } from "react";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";

interface DateRangeSelectorProps {
  setSelectedYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  setSelectedYear,
  setSelectedMonth,
}) => {
  const [selectedYear] = useState<number>();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event);
  };

  return (
    <div className="flex justify-center font-sans">
      <div className="bg-gray-100 p-5 px-8 rounded-lg border-gray-300 dark:bg-gray-800 text-center">
        <div className="text-center flex flex-row space-x-4">
          <MonthSelector
            currentSelectedYear={selectedYear}
            setSelectedMonth={handleMonthChange}
          />
          <YearSelector setSelectedYear={handleYearChange} />
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
