import React from "react";

interface YearSelectorProps {
  setSelectedYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ setSelectedYear }) => {
  const currentYear = new Date().getFullYear();
  const years = [];

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
        onChange={setSelectedYear}
      >
        <option value={""}>Year</option>
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
