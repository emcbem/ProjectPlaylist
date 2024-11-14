import React, { useEffect, useRef, useState } from "react";

interface SearchDropdownProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  stringify_option_fn: (option: T) => string
}

const SearchDropdown = <T,>({
  options,
  onSelect,
  stringify_option_fn
}: SearchDropdownProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 3) {
      setFilteredOptions(
        options.filter((option) =>
          stringify_option_fn(option).toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    else
    {
        setFilteredOptions([])
    }
    setIsOpen(true);
  };

  const handleSelect = (option: T) => {
    onSelect(option);
    setSearchTerm(stringify_option_fn(option));
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
        className=" border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-slate-500 focus:border-slate-500"
        placeholder="Search..."
      />
      {isOpen && (
        <ul className="z-10 w-full bg-white border border-gray-300 rounded-lg overflow-y-auto overflow-x-hidden max-h-48 mt-1 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {stringify_option_fn(option)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
