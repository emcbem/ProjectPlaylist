import React, { useEffect, useRef, useState } from "react";

interface SearchDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 3) {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    else
    {
        setFilteredOptions([])
    }
    setIsOpen(true);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setSearchTerm(option);
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
                {option}
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
