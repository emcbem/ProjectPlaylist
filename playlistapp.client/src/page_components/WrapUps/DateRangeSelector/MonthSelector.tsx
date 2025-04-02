import React from "react";

interface MonthSelectorProps {
  currentSelectedYear: number | undefined;
  setSelectedMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentSelectedYear,
  setSelectedMonth,
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const filteredMonths =
    currentSelectedYear === currentYear
      ? months.filter((month) => month.value <= currentMonth)
      : months;

  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      ></label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500
           px-9 "
        onChange={setSelectedMonth}
      >
        <option value={""}>Month</option>
        {filteredMonths.map((x, key) => (
          <option value={x.value} key={key}>
            {x.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default MonthSelector;
