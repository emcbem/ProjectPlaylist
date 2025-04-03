import React, { useEffect, useState } from "react";

interface YearSelectorProps {
  currentSelectedMonth: number | undefined;
  setSelectedYear: (year: number | undefined) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  currentSelectedMonth,
  setSelectedYear,
}) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  const [selectedYear, setSelectedYearState] = useState<number | "">("");

  useEffect(() => {
    if (currentSelectedMonth !== undefined && selectedYear === "") {
      setSelectedYearState(currentYear);
      setSelectedYear(currentYear);
    }
  }, [currentSelectedMonth, selectedYear, currentYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYearState(
      event.target.value === "" ? "" : Number(event.target.value)
    );
    setSelectedYear(Number(event.target.value));
  };

  for (let year = currentYear; year >= 1979; year--) {
    years.push(year);
  }

  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      ></label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500
           dark:focus:border-teal-500 px-10"
        onChange={handleYearChange}
      >
        {currentSelectedMonth == undefined ? (
          <option value={""}>Year</option>
        ) : null}

        {currentSelectedMonth == 0 && <option value={""}>Year</option>}

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};

export default YearSelector;
