import React from "react";

interface DateSelectorProps {
  month: string;
  day: string;
  year: string;
  setMonth: (month: string) => void;
  setDay: (day: string) => void;
  setYear: (year: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  month,
  day,
  year,
  setMonth,
  setDay,
  setYear,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-row w-full items-center">
      <input
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        maxLength={2}
        min="1"
        max="12"
        className="bg-clay-600 mr-2 rounded-md flex items-center justify-center leading-none w-12 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="MM"
        onKeyDown={handleKeyDown}
      />
      <h1>/</h1>
      <input
        value={day}
        onChange={(e) => setDay(e.target.value)}
        maxLength={2}
        min="1"
        max="31"
        className="bg-clay-600 mx-2 rounded-md flex items-center justify-center leading-none w-12 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="DD"
        onKeyDown={handleKeyDown}
      />
      <h1>/</h1>
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        maxLength={4}
        min="1900"
        max="2100"
        className="bg-clay-600 mx-2 rounded-md flex items-center justify-center leading-none w-16 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="YYYY"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default DateSelector;
