import React from "react";

const SearchBar = () => {
  return (
    <div className="flex-grow mx-8 flex relative justify-center">
      <div className="w-3/4 relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-6 h-6 top-2.5 left-2.5 text-slate-600"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-xl border border-black dark:border-white rounded-lg pl-10 pr-3 py-2 ring-0 focus:ring-transparent focus:border-black dark:focus:border-white"
          placeholder="Start your journey here..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
