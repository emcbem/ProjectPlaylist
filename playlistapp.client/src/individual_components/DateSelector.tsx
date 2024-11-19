import React, { useRef } from "react";

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
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
  };

  const handleDayKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (event.key === "Tab" && ref == monthRef) {
      event.preventDefault();
      dayRef.current?.focus();
    } else if (event.key === "Tab" && ref == dayRef) {
      event.preventDefault();
      yearRef.current?.focus();
    } else if (event.key === "Tab" && ref == yearRef) {
      event.preventDefault();
      monthRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-row w-full items-center">
      <input
        ref={monthRef}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        maxLength={2}
        min="1"
        max="12"
        className="dark:bg-clay-600 bg-clay-950 mr-2 rounded-md flex items-center justify-center leading-none w-12 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="MM"
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleDayKeyDown(e, monthRef);
        }}
      />
      <h1>/</h1>
      <input
        ref={dayRef}
        value={day}
        onChange={(e) => setDay(e.target.value)}
        maxLength={2}
        min="1"
        max="31"
        className="dark:bg-clay-600 bg-clay-950 mx-2 rounded-md flex items-center justify-center leading-none w-12 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="DD"
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleDayKeyDown(e, dayRef);
        }}
      />
      <h1>/</h1>
      <input
        ref={yearRef}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        maxLength={4}
        min="1900"
        max="2100"
        className="dark:bg-clay-600 bg-clay-950 mx-2 rounded-md flex items-center justify-center leading-none w-16 pl-1 border-transparent focus:border-transparent focus:ring-0 "
        placeholder="YYYY"
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleDayKeyDown(e, yearRef);
        }}
      />
    </div>
  );
};

export default DateSelector;
